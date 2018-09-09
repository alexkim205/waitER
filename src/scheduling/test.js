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

patientList = ['0681FA35-A794-4684-97BD-00B88370DB41', 'CC9CDA72-B37A-4F8F-AFE4-B08F56A183BE', 'A7142B71-A144-4D56-BD14-3E966B01DB37', '7A025E77-7832-4F53-B9A7-09A3F98AC17E', 'DDC0BC57-7A4E-4E02-9282-177750B74FBC', '9C75DF1F-9DA6-4C98-8F5B-E10BDC805ED0', '66154E24-D3EE-4311-89DB-6195278F9B3C', 'BC44CE19-9FC5-4AC9-A296-9EBC5E3D03AE', '9E18822E-7D13-45C7-B50E-F95CFF92BC3E', 'FE0B9B59-1927-45B7-8556-E079DC1DE30A', 'DCE5AEB8-6DB9-4106-8AE4-02CCC5C23741', '886B5885-1EE2-49F3-98D5-A2F02EB8A9D4','98F593D2-8894-49BB-93B9-5A0E2CF85E2E', 'A19A0B00-4C9A-4206-B1FE-17E6DA3CEB0B', '0E0EADE8-5592-4E0B-9F88-D7596E32EE08', '2E26695A-EFB0-4C7F-9318-E3030B154E39', 'E250799D-F6DE-4914-ADB4-B08A6E5029B9', 'E5478913-6819-4977-BB11-4C8B61175B56', 'EA9B67E2-15F0-450B-A8A6-14F6E4AE3D12', '3E462A8F-7B90-43A1-A8B6-AD82CB5002C9']
reserveList = ['03A481F5-B32A-4A91-BD42-43EB78FEBA77', 'FB909FAE-72DD-4F6F-9828-D92183DF185F', '64182B95-EB72-4E2B-BE77-8050B71498CE', '6E70D84D-C75F-477C-BC37-9177C3698C66', '1A40AF35-C6D4-4D46-B475-A15D84E8A9D5', 'D8B53AA2-7953-4477-9EA4-68400EBAAC5C', '25B786AF-0F99-478C-9CFA-0EA607E45834', 'C242E3A4-E785-4DF1-A0E4-3B568DC88F2E', '0BC491C5-5A45-4067-BD11-A78BEA00D3BE', 'FFCDECD6-4048-4DCB-B910-1218160005B3', '6D8008ED-D623-4BE4-B93B-335F9797C170', 'B3892204-880B-40EF-B3BB-B824B50E99E5', '49DADA25-F2C2-42BB-8210-D78E6C7B0D48', '7548B6CF-79D9-461D-A0C5-20B861406FAC', '016A590E-D093-4667-A5DA-D68EA6987D93', '7A7332AD-88B1-4848-9356-E5260E477C59', 'C8556CC0-32FC-4CA5-A8CD-9CCF38816167', 'B39DC5AC-E003-4E6A-91B6-FC07625A1285', 'FA157FA5-F488-4884-BF87-E144630D595C', 'DA6CECFF-DE13-4C4C-919F-64E1A2B76C9D', 'C54B5AAD-98E8-472D-BAA0-638D9F3BD024', 'DB92CDC6-FA9B-4492-BC2C-0C588AD78956', 'F00C64F8-2033-4640-80FE-F1F62CBE26A5', 'B70E5A76-F2BC-41E4-B037-CD4D9ABA0967', '81C5B13B-F6B2-4E57-9593-6E7E4C13B2CE', '220C8D43-1322-4A9D-B890-D426942A3649', '69B5D2A0-12FD-46EF-A5FF-B29C4BAFBE49', '6D5DCAC1-17FE-4D7C-923B-806EFBA3E6DF', '135C831F-7DA5-46C0-959C-EBCBD8810B43', '6623F5D6-D581-4268-9F9B-21612FBBF7B5', '65A7FBE0-EA9F-49E9-9824-D8F3AD98DAC0', 'FB2ABB23-C9D0-4D09-8464-49BF0B982F0F', 'C60FE675-CA52-4C55-A233-F4B27E94987F', 'B7E9FC4C-5182-4A34-954E-CEF5FC07E96D', '8D389A8C-A6D8-4447-9DDE-1A28AB4EC667', '9BBF3A51-443D-438B-9289-B98B8E0577C0', '80D356B4-F974-441F-A5F2-F95986D119A2', 'A0A976C8-9B30-4492-B8C4-5B25095B9192', '672D554B-D6D1-40B2-A6A4-21A4CB6B1AA6', 'F0B53A2C-98CA-415D-B928-E3FD0E52B22A', '79A7BA2A-D35A-4CB8-A835-6BAA13B0058C', 'CD2ADB1B-97F7-4EF6-BC5C-3E0EC562A06F', 'A50BE9B4-8A0B-4169-B894-F7BD86D7D90B', '69CC25ED-A54A-4BAF-97E3-774BB3C9DED1', '967987B9-FFEF-4776-85CF-AE05CA81F583', 'B5D31F01-7273-4901-B56F-8139769A11EF', '3B11D6B3-A36A-4B69-A437-C29BF425A941', '36E2F89E-777A-4D77-9D95-0D70A8AB416F', '2A5251B1-0945-47FA-A65C-7A6381562591', '8AF47463-8534-4203-B210-C2290F6CE689', '8856096E-E59C-4156-A767-C091AF799C80', 'DB22A4D9-7E4D-485C-916A-9CD1386507FB', '7FD13988-E58A-4A5C-8680-89AC200950FA', '0A9BA3E4-CF3C-49C4-9774-5EEA2EE7D123', '7C788499-7798-484B-A027-9FCDC4C0DADB', '6985D824-3269-4D12-A9DD-B932D640E26E', '1A8791E3-A61C-455A-8DEE-763EB90C9B2C', 'E483DE6E-D4E6-47FD-905B-22EE86EC7ACE', 'B2EB15FA-5431-4804-9309-4215BDC778C0']
console.log(patientList);

function pseudoupdate(list) {
  update_type = Math.floor((Math.random(2) * 1))
  if (update_type == 1){ //remove

  }
  else { //add
    index = Math.floor((Math.random() * (list.length-1)));
    arr.splice(index, 0, "Lene");
  }
  console.log(list)
  }
}

/*
myInterface.on('line', function (line) {
    lines.push(line);
});*/

  /*
fs.readFile("/Users/Tongyu/hackathon/PennApps/data/ESI.data.csv", "utf8", function(err, contents){
    makelist(contents)
});*/
