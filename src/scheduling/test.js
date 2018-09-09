var fs = require("fs");
var express = require("express");
var app = express();
var readline = require("readline");

var myInterface = readline.createInterface({
  input: fs.createReadStream("/Users/Tongyu/hackathon/PennApps/data/ESI.reserve.csv")
});

var lineno = 0;
myInterface.on('line', function (line) {
  lineno++;
  runtest(line, (function(data){
    console.log(data);
  });
});

function runtest(line, callback){
  app.listen(3000, function() {
    console.log("server running, port 3000");
  } )
  var spawn = require("child_process").spawn;
  var process = spawn("python",["-c", `import schedule; print (schedule.add(${line}))`]);
  process.stdout.on("data",function(data){
    var text = data.toString("utf8");// buffer to string
    callback(text);
  });
}


  /*
fs.readFile("/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv", "utf8", function(err, contents){
    makelist(contents)
});*/
