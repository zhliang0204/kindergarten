const User = require('./models/User');
const Event = require('./models/Event');
const Application = require('./models/Application');
const Final = require('./models/Final');

// Find the organizer of the event
// if no one apply for it
function findOrg(array, key){
  if (array.length === 0){
    return []
  }
  let resMin = array[0];
  for(let i = 1; i < array.length; i++){
    if(resMin[key] > array[i][key]){
      resMin = array[i]
    }
  }
  let res = {
   _eventId:resMin._eventId,
   _userId:resMin._userId,
   username:resMin.username,
   role:"oragnizer",
   serviceDate:resMin.serviceDate
  };
  return [res]
}

// sort by date of applicants
function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

// find required people of applicants
function findKElements(array, k){
  // array
  // k is the required number of applicants
    let len = array.length > k ? k: array.length;
    let res = [];
    for(i = 1; i < len; i++){
      let cur = {
        _eventId:array[i]._eventId,
        _userId:array[i]._userId,
        username:array[i].username,
        serviceDate:array[i].serviceDate
      }
      res.push(cur);
    }
    return res;
}

function getId(users){
  let res = [];
  for(let i = 0; i< users.length; i++){
    res.push(users[i]._id)
  }
  return res;
}

function createFinal(event){

  var org = findOrg(event.candidates, "created_at");
  console.log("---------------------org-----------------------------")
  console.log(org[0]);
  if(org.length === 0){
    return
  } else {
    let candidates = sortByKey(event.candidates, "created_at");
    console.log("---------------------candidates-----------------------------")
    console.log(candidates)
    let participants;
    if (candidates.length === 0){
      participants = org.slice();
    } else {
      participants = findKElements(candidates, event.reqpersons);
      participants.unshift(org[0])
    }    
      Final.create(participants)
      .then(saveParticipants => {
        let ids = getId(saveParticipants)
        Event.findOneAndUpdate({_id: event._id}, {$set:{finals:ids, eventState:'published'}})
        .then(console.log('--------works------'))
      })
  }
  
}

function UpdateFinals(event){
  let curDate = new Date();
  let scheduleDate = new Date(event.applybefore);
  if(curDate > scheduleDate){
    createFinal(event)
  }
}



module.exports = {

  UpdateFinals
}