function CussOff_PageLoading() {
    var b = document.body;
    if (b) {
        b.style.visibility = "hidden";
    } else {
        setTimeout("CussOff_PageLoading()", 0.1);
    }
}

CussOff_PageLoading();
