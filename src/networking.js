
var socks = {};
var ids = [1337];

function setup(io){
    io.on("connection", (sock) => {

        let id;

        function serveClient(){

            let i = 50;

            function ping(){
                sock.emit("system-message", `${i}`);
                if(i > 0 && Math.random() < 0.1){
                    i--;
                }
            };

            //1 second interval repeat forever
            setInterval(ping, 100);

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
