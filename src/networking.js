function setup(io){
    io.on("connection", (sock) => {
        let msg = "Hello";
        sock.emit("system-message", msg);
    });
}

module.exports.setup = setup;