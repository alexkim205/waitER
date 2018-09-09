var io = require('socket.io-client')();


io.on("system-message", (text) => {
  // console.log(text);
  updateQueue(text);
});

function updateQueue(text) {

  // once text reaches 0, remove and replace with big check
  if (text == "0") {
    $(".single-chart").css({
      'display': 'none'
    })
    $(".yourein").css({
      'display': 'block'
    })
    $(".status>p").text("Thank you for waiting. A nurse will be with you shortly.")
  }

  // let infobox = document.getElementById("infobox");
  // infobox.innerHTML = text;
  let queuepos = $('#queuepos');
  let circlered = $('#progresscirclered');
  let circlegray = $('#progresscirclegray')
  let text_circle = 0,
    max_text = 20;
  if (text > max_text) {
    text_circle = max_text;
  }
  queuepos.text(text);
  console.log(text * 100 / max_text)
  circlered.attr({
    'stroke-dasharray': text * 100 / max_text + ', ' + 100
  })
  circlegray.attr({
    'stroke-dasharray': text * 100 / max_text + ', ' + 100
  })

}

function sendData(text) {
  io.emit("system-message", text);
}

function setup(id) {
  io.emit("validate-id", id);
}

io.on("id-valid", (response) => {
  //let loadingcontent = document.querySelector("#loadingcontent");
  //loadingcontent.style = "display: none;";
  //let innercontent = document.querySelector("#innercontent");
  //innercontent.style = "";
});

io.on("id-invalid", (reason) => {
  window.location = "../404";
  //let loadingcontent = document.querySelector("#loadingcontent");
  //loadingcontent.style = "display: none;";
  //let errorcontent = document.querySelector("#errorcontent");
  //errorcontent.style = "";
});

module.exports.sendData = sendData
module.exports.setup = setup

console.log("Networking setup");