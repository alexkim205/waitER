var network;

function setup(id){

    var getdata = require('./getdata')
    //require('./triage')
    network = require('./network.js');

    var headers = {
        'Authorization': 'Bearer ' + 'demo',
        'Accept': 'application/json'
    };
    var url = 'https://api.humanapi.co/v1/human/activities/summaries?access_token=demo&source=myfitnesspal&limit=10'

    getdata.getUserData(url, headers, function (error, data) {
        console.log(error);
        console.log(data);
    });

    network.setup(id);
}

function setupTriage(){
    require('./triage');
}

function requestHelp(){
    if(network){
        network.sendData("help-request");
    }
}

window.exportedFunctions = {
    "requestHelp": requestHelp,
    "setup": setup,
    "setupTriage": setupTriage
};
