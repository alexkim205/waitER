var getdata = require('./getdata')
//require('./triage')
var network = require('./network.js');

var headers = {
    'Authorization': 'Bearer ' + 'demo',
    'Accept': 'application/json'
};

function requestHelp(){
    network.sendData("help-request");
}

function setup(id){
    network.setup(id);
}

window.exportedFunctions = {
    "requestHelp": requestHelp,
    "setup": setup
};
