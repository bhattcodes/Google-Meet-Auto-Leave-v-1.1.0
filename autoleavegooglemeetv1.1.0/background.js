console.log("background script working of algm");
let obj = {};
var t = null;
var minute;
var sec;
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "tickbtnclicked") {
            obj = request.object;
            // console.log(obj);
            if (t != null) {
                clearTimeout(t);
                t = null;
            }
            if (obj.type == "time") {
                timefunction();
            } else if (obj.type == "number") {

                if (obj.select == "members") {
                    try {
                        membersfunction();
                    } catch {
                        console.log("ERROR JOIN MEET");
                    }
                } else if (obj.select == "minutes") {
                    minute = obj.value;
                    sec = 01;
                    minutesfunction();
                }

            }

        }

        if (request.message == "stopbtnclicked") {
            console.log("stop btn clicked");
            clearTimeout(t);
            t = null;
        }
    }
);

function timefunction() {
    // console.log("time fxn",obj.value);
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    let time = hours + ":" + minutes;
    // console.log(time);
    if (time == obj.value) {
        console.log("STOP THE MEET");
        try {
            window.document.querySelector(".FbBiwc").click();
        } catch {
            console.log("ERROR");
        }
    } else {
        t = setTimeout(timefunction, 60000);
    }
}
function membersfunction() {
    // console.log("member fxn", obj.value);
    console.log("checking members");
    if (document.querySelector(".gV3Svc>span").nextElementSibling.innerText < obj.value) {
        console.log("STOP THE MEET");
        try {
            window.document.querySelector(".FbBiwc").click();
        } catch {
            console.log("ERROR");
        }
    }
    else {
        t = setTimeout(membersfunction, 5000);
    }
}
function minutesfunction() {
    // console.log("minutes fxn", obj.value);
    // console.log(minute, sec);
    sec--;
    if (sec == 00) {
        minute--;
        sec = 60;
    }
    if (minute >= 0) {
        t = setTimeout(minutesfunction, 1000);

    }
    else {
        console.log("STOP THE MEET");
        try {
            window.document.querySelector(".FbBiwc").click();
        } catch {
            console.log("ERROR");
        }
    }

}