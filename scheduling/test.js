var fs = require("fs");
var express = require("express");
var app = express();


function runtest(callback){
  app.listen(3000, function() {
    console.log("server running, port 3000");
  } )

  var spawn = require("child_process").spawn;
  var process = spawn("python",["schedule.py"]);
  process.stdout.on("data",function(data){
    var text = data.toString("utf8");// buffer to string
    callback(text);
  });
}

runtest(function(data){
  console.log(text);
});

  /*
fs.readFile("/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv", "utf8", function(err, contents){
    makelist(contents)
});*/
