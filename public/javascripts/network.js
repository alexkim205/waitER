var io = require('socket.io-client')();

/*io.on("request-id", () => {
    let id = generateID();
    io.emit("generate-id", id);
});*/

io.on("system-message", (text) => {
    chatMessage(text);
});

function chatMessage(text){
    let infobox = document.querySelector("#infobox")
    infobox.value = text;
}

function sendData(text){
    io.emit("system-message", text);
}

module.exports.sendData = sendData

console.log("Networking setup");