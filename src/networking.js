
var socks = {};
var ids = [1337];

function setup(io){
    io.on("connection", (sock) => {
        let msg = "Hello\n";

        let id;

        function serveClient(){

            let i = 50;

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
        };

        sock.on("validate-id", (idtext) => {
            if(isValidId(idtext)){
                id = idtext;
                socks[id] = sock;
                console.log(`Client ID is ${id}`);
                sock.emit("id-valid", {});
                serveClient();
            }
            else{
                console.log(`Invalid ID ${idtext}`);
                sock.emit("id-invalid", `ID ${idtext} does not exist in the database`);
            }
        });
    });
}

function isValidId(idtext){
    if(ids.includes(idtext)){
        return true;
    }
    return false;
}

module.exports.setup = setup;
