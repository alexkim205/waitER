var request = require('request')

function getUserData(url, headers, callback) {
  request({
    method: 'GET',
    uri: url,
    headers: headers
  }, function (error, res, body) {
    var parsedResponse;
    if (error) {
      callback(new Error('Unable to connect to the Human API endpoint.'));
    } else {
      if (res.statusCode == 401) {
        logger.debug("Unauthorized request, validate access token");
        callback(null, {
          status: 'unauthorized'
        });
      } else {
        try {
          parsedResponse = JSON.parse(body);
        } catch (error) {
          return callback(new Error('Error parsing JSON response from Human API.'));
        }
        // At this point you can use the JSON object to access the results
        console.log("Latest blood glucose measurement");
        console.log(parsedResponse.bloodGlucose.value);
        return callback(null, parsedResponse);
      }
    }
  })
}

// getUserData(url, headers, function (error, data) {
//   console.log(error)
//   console.log(data)
// })

module.exports.getUserData = getUserData;