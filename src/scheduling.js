var patientList = [];

function remove(id) {
  let pos = position(id);
  patientList.splice(pos, 1);
}

//id,null,startTime,null,esi
function add(id) {
  let index = patientList.length;
  for (i = 0; i < patientList.length; i++) {
    let current_ESI = patientList[i].split(',')[4];
    //let current_start_time = patientList[i].split(',')[2];
    let new_ESI = id.split(',')[4];
    //let new_start_time = id.split(',')[2];
    if(new_ESI < current_ESI){// && new_start_time <= current_start_time){
      index = i;
      break;
    }
  }
  patientList.splice(index, 0, id);
}

function position(id) {
  let names = []
  patientList.forEach(function(entry) {
    let idx = entry.split(',')[0];
    names.push(idx);
  });
  let pos = names.indexOf(id + '');
  return pos;
}

function getPatientList(){
  return patientList;
}

function from(id, startTime, esi){
  return `${id},0,${startTime},0,${esi}`;
}

module.exports = {
  "remove": remove,
  "add": add,
  "position": position,
  "getPatientList": getPatientList,
  "from": from
};