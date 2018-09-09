let scheduling = require('./scheduling.js');

var dashboards = [];
var socks = {};
var ids = [1337];

function setup(io){
    io.on("connection", (sock) => {

        let id;

        function serveClient(){

            /*let i = 50;

            function ping(){
                sock.emit("system-message", `${i}`);
                if(i > 0 && Math.random() < 0.1){
                    i--;
                }
            };

            //1 second interval repeat forever
            setInterval(ping, 100);*/

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
                sock.emit("system-message", patientStatus(id));
                serveClient();
            }
            else{
                console.log(`Invalid ID ${idtext}`);
                sock.emit("id-invalid", `ID ${idtext} does not exist in the database`);
            }
        });

        sock.on("add-patient", (patientInfo) => {
            let esi = patientInfo.esi;
            let startTime = new Date().toISOString();
            let id = generateId();
            ids.push(id);
            scheduling.add(scheduling.from(id, startTime, esi));
            pushUpdate();
            sock.emit("generated-id", id);
        });

        sock.on("remove-patient", (id) => {
            scheduling.remove(id);
            pushUpdate();
        });

        sock.on("add-dashboard", () => {
            dashboards.push(sock);
        });
    });
}

function generateId(){
    return Math.floor(Math.random() * 1000000) + 1;
}

function isValidId(idtext){
    if(ids.includes(idtext)){
        return true;
    }
    return false;
}

function pushUpdate(){
    for(let key in socks){
        if(socks.hasOwnProperty(key)){
            socks[key].emit("system-message", patientStatus(key));
        }
    }
    for(let i = 0; i < dashboards.length; i++){
        let sock = dashboards[i]
        sock.emit("patient-list", scheduling.getPatientList());
    }
}

function patientStatus(id){
    return scheduling.position(id) + 1;
}

module.exports.setup = setup;
