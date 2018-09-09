var io = require('socket.io-client')();

io.emit("add-dashboard");

io.on("patient-list", (patientList) => {
    console.log("Patient list");
    let ids = [];
    patientList.forEach(function(entry) {
        let splitted = entry.split(',');
        let idx = splitted[0];
        let startTimex = splitted[2];
        let esix = splitted[4];
        ids.push({"id": idx,
            "startTime": startTimex,
            "esi": esix});
    });
    generate(ids);
});


let menuId;

function setMenuId(id){
    menuId = id;
}

function generate(list) {
    let wipe = true;
    var mydiv = $("#myPatients>div.scroll");
    mydiv.children().remove();
    let index = 1;
    list.forEach(function(data) {
        let id = data.id;
        if(id == menuId){
            wipe = false;
        }
        let startTime = data.startTime;
        let esi = data.esi;
        var tag = document.createElement('a');
        tag.setAttribute('onclick',`menu("Position: ${index} <br /> ID: ${id}  <br /> Time: ${startTime} <br /> ESI: ${esi} <br /> <button onclick='exportedFunctions.removeFromDashboard(\`${id}\`);'>Remove from list</button>");`);
        tag.innerHTML = id;
        mydiv.get(0).appendChild(tag);
        index += 1;
    });
    if(wipe){
        document.getElementById("myDIV").innerHTML = "Go to the Triage to add patients to the queue to display on the dashboard.";
    }
}

function remove(id){
    io.emit("remove-patient", id);
}

module.exports.remove = remove;
module.exports.setMenuId = setMenuId;