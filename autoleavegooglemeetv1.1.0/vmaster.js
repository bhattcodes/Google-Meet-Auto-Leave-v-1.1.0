backgroundcheck();

function backgroundcheck() {
    let backgroundwork = localStorage.getItem("backgroundwork");
    if (backgroundwork == "yes") {
        // let area=localStorage.getItem("area");
        // console.log(area);
        //  if ( area== "time") {
        //     document.querySelector(".timeicon").click();
        // }
        // else if (area=="members"){
        //     document.querySelector(".membericon").click();

        // }
        // else if(area=="minutes"){
        //     document.querySelector(".minutesicon").click();

        // }
        // console.log(localStorage.getItem("val"))
        // let textarea = localStorage.getItem("area");
        // if (textarea == "time") {
        //     document.querySelector(".inputvalue").value = localStorage.getItem("value");
        // }
        document.querySelector(".hourglassicon").style.visibility = "visible";
        document.querySelector(".inputvalue").disabled = true;
        // document.querySelector(".inputvalue").value = localStorage.getItem("value");


    } else if (backgroundwork == "no") {
        document.querySelector(".hourglassicon").style.visibility = "hidden";
        document.querySelector(".inputvalue").value = "";
    }
}
document.querySelector(".timeicon").addEventListener("click", () => {
    backgroundcheck();
    document.querySelector(".inputvalue").setAttribute("type", "time");
    document.querySelector(".inputvalue").style.left = "78px";
    document.querySelector(".inputvalue").setAttribute("placeholder", "time");
    // let textarea = localStorage.getItem("area");
    // if (textarea == "time") {
    //     document.querySelector(".inputvalue").value = localStorage.getItem("value");
    // }
})
document.querySelector(".membericon").addEventListener("click", () => {
    backgroundcheck();
    document.querySelector(".inputvalue").setAttribute("type", "number");
    document.querySelector(".inputvalue").setAttribute("placeholder", "members");
    document.querySelector(".inputvalue").style.left = "78px";
    document.querySelector(".inputvalue").style.width = "90px";
    // backgroundcheck();
    // let textarea = localStorage.getItem("area");
    // if (textarea == "members") {
    //     document.querySelector(".inputvalue").value = localStorage.getItem("value");
    // }
})
document.querySelector(".minutesicon").addEventListener("click", () => {
    backgroundcheck();
    document.querySelector(".inputvalue").setAttribute("type", "number");
    document.querySelector(".inputvalue").setAttribute("placeholder", "minutes");
    document.querySelector(".inputvalue").style.left = "78px";
    document.querySelector(".inputvalue").style.width = "90px";
    // let textarea = localStorage.getItem("area");
    // if (textarea == "minutes") {
    //     document.querySelector(".inputvalue").value = localStorage.getItem("value");
    // }
})
document.querySelector(".tickicon").addEventListener("click", () => {


    let obj = {
        "type": document.querySelector(".inputvalue").getAttribute("type"),
        "value": document.querySelector(".inputvalue").value,
        "select": document.querySelector(".inputvalue").getAttribute("placeholder")
    }
    if (obj.value != "") {
        if (obj.value < 0) {
            document.querySelector(".inputvalue").style.border = "2px solid red";
            setTimeout(() => {
                document.querySelector(".inputvalue").style.border = "1px solid black";
            }, 2000);
        }
        else {
            localStorage.setItem("backgroundwork", "yes");
            document.querySelector(".inputvalue").disabled = true;
            localStorage.setItem("value", obj.value);
            localStorage.setItem("area", obj.select);
            document.querySelector(".hourglassicon").style.visibility = "visible";
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { "message": "tickbtnclicked", "object": obj });
            });
        }
    }
    else {
        console.log("enter value");
        document.querySelector(".inputvalue").style.border = "2px solid red";
        setTimeout(() => {
            document.querySelector(".inputvalue").style.border = "1px solid black";
        }, 2000);
    }

    // document.querySelector(".inputvalue").value="";
})
document.querySelector(".stopicon").addEventListener("click", () => {

    document.querySelector(".inputvalue").disabled = false;
    document.querySelector(".inputvalue").value = "";
    localStorage.setItem("backgroundwork", "no");
    document.querySelector(".hourglassicon").style.visibility = "hidden";
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "stopbtnclicked" });
    });


})