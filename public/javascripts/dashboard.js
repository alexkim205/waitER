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
    var mydiv = $("#myPatients>div.scroll");
    mydiv.children().remove();
    list.forEach(function(id) {
      var tag = document.createElement('a');
      tag.setAttribute('onclick',"menu(id);");
      tag.innerHTML = id;
      mydiv.get(0).appendChild(tag);
    });
}