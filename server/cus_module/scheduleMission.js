// time schedule missions, update database

const User = require('./../models/User');
const Event = require('./../models/Event');
const Application = require('./../models/Application');
const Final = require('./../models/Final');
const AverageServiceHours = require("./../models/AverageServiceHours");
const Attendence = require("./../models/Attendence");
var schedule = require('node-schedule');

// test for schedule module
var j = schedule.scheduleJob('10 * * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});

function x(){
  console.log("test whether is works?")
}

// update table AverageServiceHours
function aveSevHY(){
  var date = new Date();
  var year = date.getFullYear;
  let childNum = calChildNum()

  AverageServiceHours.create({
    year:year,
    childNum: childNum,
    AveHours: 0,
    TotalHours: 0,
  })
}

// 
function calChildNum(){
  var pipeline = [
    {
        $group : {
            _id: {
                $state: "stay"
            }
        },
        count: {
            $sum: 1
        }
    }
  ]
  let childNum = Child.aggregate(pipeline)
  return childNum
}

// 
function calEventHours(){
  var date = new Date();
  var year = date.getFullYear() - 1;
  var curYear = '01/01/' + year;
  var curdate = new Date(curYear);

  let result = Event.aggregate([
    {$math: {eventState:'finish',ended:{$gte: curdate}}},
    {$group: {_id:null, total:{$sum: totalHours}}},
    {$project: {total: "$total"}}
  ])
  return result.total
}

// update service hours of last year;
// update at september every year;
function perSevHY(){
  var date = new Date();
  var year = date.getFullYear() - 1;
  
  User.find().forEach(function(ele){
    let serviceHours = {year:year, totalHours:ele.totalHours,aveHours:ele.aveHours }
    User.update({},{$push: {historyServiceHours:serviceHours}}, 
                    {$set: {currentServiceHours:0, aveHours:0}})
  })
}


// update AverageServiceHours
function aveSevHD(){
  var date = new Date();
  var year = date.getFullYear();
  var childNum = calChildNum();
  var totalHours = calEventHours();
  var aveHours = totalHours / childNum;
  AverageServiceHours.find({year:year}, {$set: {
    childNum: childNum,
    AveHours: aveHours,
    TotalHours: totalHours,
  }})
}


function countApplicants(eventId){
  let totalDoc = Attendence.find({_event:eventId}).count()
  return totalDoc;
}


function voteEventState(){
  let stopEventId = [];
  let applyEventId = [];
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  let timeDifference = 5 * 60 * 60 * 24 * 1000
  Event.find({eventState:"vote"})
       .then(events => {
          events.forEach(cur => {
            if(cur.created_at.getTime() >= curDateTime - timeDifference){
              let voteres = voteRes(cur._id)
              if(voteres > 0){
                applyEventId.push(cur._id)
              } else {
                stopEventId.push(cur._id)
              }
            }
          })
       })
  Event.update({_id:{$in:stopEventId}},{$set:{eventState:"stop"}})
  Event.update({_id:{$in:applyEventId}},{$set:{eventState:"apply"}})
}

function voteRes(eventId){
  let voteRes =
   Vote.find({_event:eventId}).aggregate(
    [
      {
        $group : {
          _id: $voted,
          total:{$sum : voted}
        }
      }
    ]
  )
  res = voteRes.total > 0? 1:-1;
  return res
}

// find events need to get participants
// return an array of events
function findEvent(){
  let resEvent = Event.find({$and: {eventState:"apply", applybefore:{$lte:new Date()}}})     
  return resEvent
}

function findAndUpdateOrg(eventId){
  let minHours = 555;
  let resUser;
  Attendence.find({_event:eventId})
            .populate("_user")
            .then(attendants => {
              attendants.forEach(att => {
                if(att._user._aveHours < minHours){
                  minHours = att._user._aveHours
                  resUser = att._user._id
                }
              })
            })
  Attendence.findOneAndUpdate({_event:eventId,_user:resUser},{$set:{tag:"organize"}})
}

function findAndUpdateAsgOrg(eventId){
  let minHours = 555;
  let resUser;
  User.find()
    .then(users => {
    users.forEach(att => {
      if(att._user._aveHours < minHours){
        minHours = att._user._aveHours
        resUser = att._user._id
      }
    })
  })
  Attendence.create({
    _event:eventId,
    _user:resUser,
    tag:"assigned Org",
  })
}

function findAndUpdateParticipants(eventId, num){
  let resUser;
  Attendence.find({_event:eventId, tag:"apply"})
            .then(atts => 
              {resUser = atts.slice()})
  if(resUser.length == num){
    Attendence.update({_event:eventId, tag:"apply"}, {$set:{tag:"participate"}})
  } else {
    let userId = [];
    let resUserId = [];
    resUser.map(cur => userId.push(cur._user))
    User.find({_id:{$in:userId}})
        .sort({aveHours:1})
        .limit(num)
        .then(resUser =>{
          resUser.map(cur => {
            resUserId.push(cur._id)
          })
        })
    Attendence.update({_event:eventId,_user:{$in:resUserId}},{$set:{tag:"participate"}})
  }
}

function findAndUpdateAssigned(eventId, num){
  
  let applyUserID = [];
  Attendence.find({_event:eventId})
            .then(atts => {
              if(atts){
                applyUserID.push(atts._user)
              }
            })
  let createAtta = [];        
  if(!applyUserID){
    User.find()
        .sort({aveHours:1})
        .limit(num)
        .then(resUser =>{
          resUser.map(cur => {
            createAtta.push({_event:eventId,_user:cur._id,tag:"assigned"})
          })
          return createAtta
        })
        .then(newAtta => {
          Attendence.create(newAtta)
        })
    
  } else {
    User.find({_id:{$nin:pplyUserID}})
        .sort({aveHours:1})
        .limit(num)
        .then(resUser =>{
          resUser.map(cur => {
            createAtta.push({_event:eventId,_user:cur._id,tag:"assigned"})
          })
          return createAtta
        })
        .then(newAtta => {
          Attendence.create(newAtta)
        })
  }
}

function updateEventFinals(){
  let events = findEvent();
  events.forEach((curEvent) => {
    let applyNum = countApplicants(curEvent._id)
    if(applyNum === 0){
      const p1 = new Promise(resolve => {
        findAndUpdateAsgOrg(curEvent._id)
      })

      p1.then(res => {findAndUpdateAsgOrg(curEvent._id)})
      
      // findAndUpdateAsgOrg(curEvent._id)
      // findAndUpdateAssigned(curEvent._id, curEvent.reqpersons-1)
     
    } else {
      if(applyNum < curEvent.reqpersons){
        const p2 = new Promise(resovle =>{findAndUpdateOrg(curEvent._id)})
        p2
         .then(res => findAndUpdateParticipants(curEvent._id, applyNum -1))
         .thern(res =>  findAndUpdateAssigned(curEvent._id, curEvent.reqpersons-applyNum))

        // findAndUpdateOrg(curEvent._id)
        // findAndUpdateParticipants(curEvent._id, applyNum -1)
        // findAndUpdateAssigned(curEvent._id, curEvent.reqpersons-applyNum)
      } else {
        const p3 = new Promise(resolve => {findAndUpdateOrg(curEvent._id)})
        p3.then(res => {findAndUpdateParticipants(curEvent._id, curEvent.reqpersons -1)})

        // findAndUpdateOrg(curEvent._id)
        // findAndUpdateParticipants(curEvent._id, curEvent.reqpersons -1)
      }
    }
  })
}

function updateCurServiceHours(){
  Event.find({eventState:"close"})
        .populate("finals")
        .then(res => {
          res.forEach((finishEvent) => {
            let curEventHours = finishEvent.reqhours
            finishEvent.finals.forEach((final) =>{
                User.find({_id:_userId})
                .exec(function(err,data) {
                  if(err){
                    return
                  }
                  User.findByIdAndUpdate(request.id, {
                    $set:{
                      currentServiceHours:data.currentServiceHours+curEventHours
                    }},{
                      new:true
                    }
                  )
                })
            })
          })
        })
}


var updateServiceEveryYear = schedule.scheduleJob('0 0 3 9 *', function(){
  perSevHY();
  aveSevHY()
})

var updateAverServieHourDay = schedule.scheduleJob('1 0 * * *', function(){
  aveSevHD()
})

var updateEventFinalParticipant = schedule.scheduleJob('1 1 * * *', function(){
  updateEventFinals()
})

var updateEventState = schedule.scheduleJob('1 2 * * *', function(){
  voteEventState()
})

module.exports = {
  updateServiceEveryYear,
  updateAverServieHourDay,
  updateEventFinalParticipant,
  updateEventState
}