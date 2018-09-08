var getdata = require('./getdata')

var headers = {
    'Authorization': 'Bearer ' + 'demo',
    'Accept': 'application/json'
};
var url = 'https://api.humanapi.co/v1/human'

getdata.getUserData(url, headers, function (error, data) {
    console.log(error)
    console.log(data)
})