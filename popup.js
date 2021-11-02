var imgToReplace = {};
var isActive = {};
var doJumpscare = {};

window.onload = function () {
    imgToReplace = document.getElementById("imageToReplace");
    isActive = document.getElementById("isActive");
    doJumpscare = document.getElementById("doJumpscare");
    getFromStorage();
    document.getElementById("form").onsubmit = submit;
};



function submit() {
    setStorage().then(() => {
        return false;
    }).catch((err) => {
        return false;
    });
    return false;
}

function setStorage() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.set({ "plugin-img-replacer_src": imgToReplace.value }, function () {
                chrome.storage.sync.set({ "plugin-img-replacer_active": isActive.checked }, function () {
                    chrome.storage.sync.set({ "plugin-img-replacer_jumpscare": doJumpscare.checked }, function () {
                        writeLog("Saved!")
                        resolve();
                    });
                });
            });
        } catch (err) {
            writeLog("Error saving: " + err);
        }
    })
}

function getFromStorage() {
    try {
        chrome.storage.sync.get(["plugin-img-replacer_active", "plugin-img-replacer_src", "plugin-img-replacer_jumpscare"], function (result) {
            console.log("Result", result)
            isActive.checked = result["plugin-img-replacer_active"];
            doJumpscare.checked = result["plugin-img-replacer_jumpscare"]

            if (result["plugin-img-replacer_src"] && result["plugin-img-replacer_src"].length) {
                imgToReplace.value = result["plugin-img-replacer_src"];
            } else {
                imgToReplace.value = "https://laopinion.com/wp-content/uploads/sites/3/2021/06/johncena-getty.jpg?quality=80&strip=all&w=1200" + "\n"
                + "https://theo.minuspoint.com/wooobooru/_images/161ea7b21752a2874f039389f0da28f2/19045%20-%20john_cena%20shocked%20wrestlemania%20wwe%20yelling.png" + "\n"
                + "https://c.tenor.com/M8PQrRet_wgAAAAd/john-cena-wwe.gif"
            }
        });
    } catch (err) {
        writeLog("Error get: " + err)
    }
}

function resetAll() {
    imgToReplace = {};
    isActive = {};

    chrome.storage.local.remove([keySrc, keyActive], function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    })
}

function writeLog(msg, isError) {
    let domLog = document.getElementById("log");
    domLog.innerText = msg;

    if (isError)
        domLog.classList.add("error");
    else
        domLog.classList.remove("error");
}