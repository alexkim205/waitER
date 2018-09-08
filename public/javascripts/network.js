var io = require('socket.io-client')();

io.on("verify-id", (id=666) => {
    // get user input
    let input = prompt("Please enter your ID", "#######");
    if(input == id){
        io.emit("system-message", `Log in successful\n`);
        io.emit("correct-id", id);
        //show data
    }
    else {
        io.emit("system-message", `Incorrect, generating ID...\n`);
        generateID();
    }
})

io.on("system-message", (text) => {
    chatMessage(text);
});

function generateID(){
    id = Math.floor((Math.random() * 100) + 1);
    io.emit("generate-id", id);
}

function chatMessage(text){
    let infobox = document.querySelector("#infobox");
    infobox.value = text;
}

function sendData(text){
    io.emit("system-message", text);
}

module.exports.sendData = sendData

console.log("Networking setup");
