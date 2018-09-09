var fs = require("fs");
var express = require("express");
var app = express();
var readline = require("readline");

var patientList;

function makeList(callback){
  var spawn = require("child_process").spawn;
  var process = spawn("python",["-c", `import schedule; print (schedule.make_list())`]);
  process.stdout.on("data",function(data){
    var text = data.toString("utf8");// buffer to string
    callback(text);
    patientList = text;
  });
}

// operation field is either "add" or "remove", else returns error
function update(operation, patient, list, callback){
  if(operation ==`add` || operation ==`remove`){
    //console.log(`import schedule; print (schedule.${operation}(${patient}, [${list}]))`);
    var spawn = require("child_process").spawn;
    var process = spawn("python",["-c", `import schedule; print (schedule.${operation}('${patient}', [${list}]))`]);
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
makeList(function(data){
  //patientList = data;
patientList = data;
  /*
  var lines = fs.readFileSync("/Users/Tongyu/hackathon/PennApps/data/ESI.reserve.csv").toString().split("\n");
  lines.pop();
  lines.forEach(function(line) {
    update(`add`, line, lines, function(err, data){
      if(err){
        console.log('bad');
        throw new Error('Invalid operation');
      }
      else {
        console.log(data);
      }
    });
  });
  */
});

var patientList = [];

function remove(id) {
  names = []
  patientList.forEach(function(entry) {
    id = entry.split(',')[0];
    names.push(id);
  });
  position = names.indexOf(id);
  patientList.splice(position, 1);
}

function add(id) {
  let index = patientList.length;
  for (i = 0; i < patientList.length; i++) {
    let current_ESI = patientList[i].split(',')[4];
    let current_start_time = patientList[i].split(',')[2];
    let new_ESI = id.split(',')[4];
    let new_start_time = id.split(',')[2];
    if(new_ESI <= current_ESI && new_start_time <= current_start_time){
      index = i;
      break;
    }
  }
  list.splice(index, 0, id);
}

function position(name) {
  return list.indexOf(id);
}

function update(num, list) {
  if (num == 1){ //remove
    position = list.indexOf(id);
    list.splice(position, 1);
  }
  else { //add
    var index = Math.floor((Math.random() * (list.length-1)));
    var id = reserveList[Math.floor(Math.random() * reserveList.length)];
    list.splice(index, 0, id);
  }
  console.log(list)
  }


/*
myInterface.on('line', function (line) {
    lines.push(line);
});*/

  /*
fs.readFile("/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv", "utf8", function(err, contents){
    makelist(contents)
});*/
