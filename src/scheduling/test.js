var fs = require("fs");
var express = require("express");
var app = express();
var readline = require("readline");

var myInterface = readline.createInterface({
  input: fs.createReadStream("/Users/Tongyu/hackathon/PennApps/data/ESI.reserve.csv")
});
var spawn = require("child_process").spawn;
var patientno = 0;
var patientList;

function makeList(callback){
  var process = spawn("python",["-c", `import schedule; print (schedule.make_list()`]);
  process.stdout.on("data",function(data){
    var text = data.toString("utf8");// buffer to string
    callback(text);
  });
}

// operation field is either "add" or "remove", else returns error
function update(operation, patient, list, callback){
  if(operation ===`add` || operation ===`remove`){
    var process = spawn("python",["-c", `import schedule; print (schedule.${operation}(${patient}, ${list}))`]);
    process.stdout.on("data",function(data){
      var text = data.toString("utf8");// buffer to string
      callback(false, text);
    });
  }
  else {
    callback(true, null);
  }
}

/// calls
makeList((function(data){
  patientList = data;
  console.log(data);
}));

myInterface.on('line', function (line) {
  patientno++;
  patient = line
  update(`add`, patient, patientList, function(err, data){
    if(err){
      throw new Error('Invalid operation');
    }
    else {
      console.log(data);
    }
  });
});

  /*
fs.readFile("/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv", "utf8", function(err, contents){
    makelist(contents)
});*/
