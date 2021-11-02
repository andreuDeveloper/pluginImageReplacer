window.onload = function () {
    console.info("I M IN!!!")

    setTimeout(() => {
        getFromStorage();
    }, 500);

    setInterval(() => {
        getFromStorage();
    }, 1000 * 10); //Cada 10 sec
};

function getFromStorage() {
    chrome.storage.sync.get(["plugin-img-replacer_active", "plugin-img-replacer_src"], function (result) {
        //console.log("Result plugin", result)
        if (result["plugin-img-replacer_active"]) {
            changeImages(result["plugin-img-replacer_src"]);
        }
        if (result["plugin-img-replacer_scarejump"]) {
            prepareScareJump(result["plugin-img-replacer_src"]);
        }

    });
}

function changeImages(newSrc) {

    if (!newSrc || !newSrc.length) {
        return;
    }

    let allSrcs = newSrc.trim().split("\n");

    var allDom = document.querySelectorAll("*");

    for (let dom of allDom) {

        //img
        if (dom.tagName.toUpperCase() == "IMG") {
            let img = getRandomImage(allSrcs);
            dom.src = img;
            dom.currentSrc = img;
            dom.srcset = img;
        }

        //background img
        if (dom.style?.backgroundImage?.length) {
            dom.style.backgroundImage = getRandomImage(allSrcs);
        }
    }
}

var scareTimeout = null;
function prepareScareJump() {

    if (scareTimeout) return;

    scareTimeout = setTimeout(() => {


        $("html").append("<b>Appended text</b>");


        scareTimeout = null;
    }, 3000);
}

function getRandomImage(listImg) {
    let min = 0;
    let random = Math.floor(Math.random() * ((listImg.length - 1) - min + 1)) + min;
    return listImg[random];
}