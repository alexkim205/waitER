var io = require('socket.io-client')();


io.on("system-message", (text) => {
    console.log(text);
    chatMessage(text);
});

function chatMessage(text){
    let infobox = document.getElementById("infobox");
    infobox.innerHTML = text;
}

function sendData(text){
    io.emit("system-message", text);
}

function setup(id){
    io.emit("validate-id", id);
}

io.on("id-valid", (response) => {
    //let loadingcontent = document.querySelector("#loadingcontent");
    //loadingcontent.style = "display: none;";
    //let innercontent = document.querySelector("#innercontent");
    //innercontent.style = "";
});

io.on("id-invalid", (reason) => {
    //let loadingcontent = document.querySelector("#loadingcontent");
    //loadingcontent.style = "display: none;";
    //let errorcontent = document.querySelector("#errorcontent");
    //errorcontent.style = "";
});

module.exports.sendData = sendData
module.exports.setup = setup

console.log("Networking setup");
