// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) next()
//   else next({ status: 403, message: 'Unauthorized' })
// }

const User = require('./models/User');
const Event = require('./models/Event');
const Application = require('./models/Application');
const Final = require('./models/Final');

function findOrg(array, key){
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
  return res
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function findKElements(array, k){
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
  let candidates = sortByKey(event.candidates, "created_at");
  let participants = findKElements(candidates, event.reqpersons);
  participants.unshift(org)
  Final.create(participants)
        .then(saveParticipants => {
          let ids = getId(saveParticipants)
          Event.findOneAndUpdate({_id: event._id}, {$set:{finals:ids}})
          .then(console.log('--------works------'))
        })

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