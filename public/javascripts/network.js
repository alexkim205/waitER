var io = require('socket.io-client')();

io.on("system-message", (text) => {
    chatMessage(text);
});

function chatMessage(text){
    console.log(text);
    //let infobox = document.querySelector("#infobox")
    //infobox.value += text;
}

console.log("Networking setup");