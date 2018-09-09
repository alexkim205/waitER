var io = require('socket.io-client')();

io.emit("add-dashboard");

io.on("patient-list", (patientList) => {
    console.log("Patient list");
    let ids = [];
    patientList.forEach(function(entry) {
        let idx = entry.split(',')[0];
        ids.push(idx);
      });
    generate(ids);
});


function generate(list) {
    list.forEach(function(id) {
      var mydiv = document.getElementById("myPatients");
      var tag = document.createElement('a');
      tag.setAttribute('onclick',"menu(id);");
      tag.innerHTML = id;
      mydiv.appendChild(aTag);
    });
}
