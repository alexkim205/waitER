function setup(io){
    io.on("connection", (sock) => {
        let msg = "Hello\n";
        sock.emit("system-message", msg);

        let i = 50;

        function ping(){
            sock.emit("system-message", `Patients remaining: ${i}\n`);
            if(i > 0){
                i--;
            }
        };

        //1 second interval repeat forever
        setInterval(ping, 1*1000);
    });
}

module.exports.setup = setup;