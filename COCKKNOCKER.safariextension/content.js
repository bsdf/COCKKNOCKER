
// We're using a global variable to store the number of occurrences
var CussOff_SearchResultCount = 0;
var wordCusses = 'ass,asses,chinc,chink,chincs,chinks,clit,clits,cock,cocks,coon,coons,cum,cunt,cunts,dick,dicks,dike,dikes,fag,fags,heeb,heebs,hell,jap,japs,kraut,kike,kikes,muff,muffs,paki,pakis,piss,pisses,pissed,poon,shit,shits,spic,spics,spick,spicks,slut,sluts,tit,tits,twat,twats,vag';
var cusses = 'bullshit,butt plug,butt-pirate,clitface,clitfuck,cockbite,cockburger,cockface,cockfuck,cockhead,cockjockey,cockknoker,cockknocker,cockmaster,cockmongler,cockmongruel,cockmonkey,cockmuncher,cocknose,cocknugget,cockshit,cocksmith,cocksmoker,cocksniffer,cocksuck,cockwaffle,cumbubble,cumdump,cumguzz,cumjock,cumslut,cumtart,cuntass,cuntface,cunthole,cuntlicker,cuntrag,cuntslut,dickbag,dickbeat,dickface,dickhead,dickhole,dickjuice,dickshit,dickfuck,dickmilk,dickmonger,dickslap,dicksuck,dickwad,dickweasel,dickweed,dickwod,dipshit,dookie,dumbshit,dumshit,gaylord,gaytard,gaywad,fagfucker,homodumbshit,humping,lameass,nigaboo,pissflaps,mcfagget,shitbag,shitbrain,shitbreath,shitcan,shitcunt,shitface,shithead,shithole,shithouse,shitspitter,shitstain,shitter,shittiest,shitty,shitdick,shitting,slutbag,suckass,thundercunt,twatflaps,twatlips,twatwaffle,assfucker,asslicker,assmuncher,motherfucker,fucker,fuckin,fucking,titfuck,tittyfuck,fuckass,dumb ass,dumbass,dumass,asshat,assbag,assbandit,assbanger,assbite,assclown,asscock,asscracker,assface,assfuck,assgoblin,asshead,asshole,asshopper,assjacker,asslick,assmonkey,assmunch,assnigger,asspirate,ass-pirate,assshit,asssucker,asswad,asswipe,bastard,beaner,bitchtits,bitchass,bitch,blow job,blowjob,bollocks,bollox,boner,camel toe,carpetmuncher,choad,chode,cockass,coochie,coochy,cooter,cunnie,cunnilingus,damn,dildo,doochbag,douche,dyke,fagbag,faggit,faggot,fagtard,fatass,fellatio,feltch,fuck,fudgepacker,gayass,goddamn,gook,gringo,guido,handjob,hand job,hard on,honkey,jackass,jerk off,jigaboo,jizz,jungle bunny,junglebunny,kooch,kootch,kunt,kyke,lesbo,lezzie,minge,muffdiver,munging,nigga,nigger,niglet,nut sack,nutsack,panooch,pecker,penispuffer,polesmoker,pollock,poonani,poonany,poontang,porch monkey,porchmonkey,prick,punanny,punta,pussies,pussy,queef,queer,renob,rimjob,ruski,schlong,scrote,shitass,skank,skeet,smeg,snatch,splooge,wank,wetback,whore';

// helper function, recursively searches in elements and their child nodes
function CussOff_ReplaceCussInElement(element) {
	if (element) {
		if (element.nodeType == 3) {        // Text node
			var cuss;
            for (var x = 0; x < wordCusses.length; x++) {
                cuss = wordCusses[x];
                if (cuss.length <= 0) break;
                var value = element.nodeValue;  // Search for keyword in text node
                if (value.length <= 0) break;
                var rx = new RegExp("\\b"+cuss+"\\b", 'gi');
                
                element.nodeValue = value.replace(rx, cuss.toUpperCase());
            }
			for (var x = 0; x < cusses.length; x++) {
				while (true) {
                    cuss = cusses[x];
                    if (cuss.length <= 0) break;
                    var value = element.nodeValue;  // Search for keyword in text node
                    if (value.length <= 0) break;
					var idx = value.toLowerCase().indexOf(cuss);					
					
					if (idx < 0) break;             // not found, abort
                    
					var newText = document.createTextNode(cuss.toUpperCase());
					var postText = document.createTextNode(value.substr(idx+cuss.length));
					element.deleteData(idx, value.length - idx);
					var next = element.nextSibling;
					element.parentNode.insertBefore(newText, next);
					element.parentNode.insertBefore(postText, next);
					CussOff_ReplaceCussInElement(postText);
					
					CussOff_SearchResultCount++;
				}
			}
		} else if (element.nodeType == 1) { // Element node
			if (element.style.display != "none" && element.nodeName.toLowerCase() != 'select') {
				for (var i=element.childNodes.length-1; i>=0; i--) {
					CussOff_ReplaceCussInElement(element.childNodes[i]);
				}
			}
		}
	}
}

// the main entry point to start the search
function CussOff_ReplaceCuss(keywords) {
	cusses = keywords.toLowerCase().split(",");
    wordCusses = wordCusses.toLowerCase().split(",");
	CussOff_ReplaceCussInElement(document.body);
    setTimeout("CussOff_DisplayBody()", 0.1);
}

function CussOff_DisplayBody() {
    console.log("Loading finished ... attempting to display body.");
    var b = document.body;
    if (b) {
        b.style.visibility = "visible";
    } else {
        setTimeout("CussOff_DisplayBody()", 0.1);
    }
}

CussOff_ReplaceCuss(cusses);
