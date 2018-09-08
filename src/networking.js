
var socks = {};


function setup(io){
    io.on("connection", (sock) => {
        let msg = "Hello\n";

        let i = 50;

        let id;

        sock.emit("verify-id", id);
        sock.on("generate-id", (idtext) => {
            id = idtext;
            socks[id] = sock;
            console.log(`Client ID is ${id}`);
        });

        sock.on("correct-id", (id) => {
            socks[id];//do stuff
        });

        function ping(){
            sock.emit("system-message", `Patients remaining: ${i}\n`);
            if(i > 0){
                i--;
            }
        };

        //1 second interval repeat forever
        setInterval(ping, 1*1000);

        sock.on("system-message", (text) => {
            console.log(`System message: ${text}`);
        });
    });
}

module.exports.setup = setup;
