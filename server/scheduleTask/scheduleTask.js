const path = require('path')
require('dotenv').config({ path: path.join(__dirname, './../.env') })


const mongoose = require("mongoose");


require('./../configs/database')




const User = require('./../models/User');
const Child = require('./../models/Child')
const Event = require('./../models/Event');
const Application = require('./../models/Application');
const AverageServiceHours = require("./../models/AverageServiceHours");
const Attendence = require("./../models/Attendence");
const Vote = require("./../models/Vote");
const EventSchedule = require("./../models/EventSchedule");
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')


// function to judge whether today is 09-01
function isSepFirst(){
  let date = new Date()
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if(month === 9 && day === 1){
    return true
  } else {
    return false
  }
}

// every september, create a new document to record averhours and total hours
function aveSevHY(){
  var date = new Date();
  var year = date.getFullYear();
  calChildNum().then(numOfChild => {
    AverageServiceHours.create({
      year:year,
      childNum: numOfChild,
      AveHours: 0,
      TotalHours: 0,
    })
    .then(Aver => console.log(Aver))
  })
}

function calChildNum(){ 
 return(
  Child.find({state:"stay"}).count()
  .exec()
  .then(total => {
    return total
  })
 ) 
}

// every september, update every user history service information
function perSevHY(){
  var date = new Date();
  var year = date.getFullYear() - 1;
  
  User.find({isActive:true, role:"parent"}).then(users =>{
    users.forEach(function(ele){
      let serviceHours = {year:year, totalHours:ele.totalHours,aveHours:ele.aveHours }
      User.findOneAndUpdate({_id:ele._id},
        {
          $push: {historyServiceHours:serviceHours},
          $set: {aveHours:0,totalHours:0}
        }
      ).then(res => console.log("--personal service history update--"))
    })
  })
}

// update event state according to vote result
// update every day mid-night
function voteEventState(){
  let stopEventId = [];
  let applyEventId = [];
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  // left 5 days for vote
  let timeDifference1 = 5 * 60 * 60 * 24 * 1000
  let timeDifference2 = 4 * 60 * 60 * 24 * 1000

  Event.find({eventState:"vote"})
       .then(events => {
          events.forEach(cur => {
            if(cur.created_at.getTime() >= curDateTime - timeDifference1 && cur.created_at.getTime() < curDateTime - timeDifference2){
              voteRes(cur._id).then(votes => {
                if(votes > 0){
                  Event.findOneAndUpdate({_id:cur._id},{$set:{eventState:"apply"}})
                        .then(res => console.log("--apply--"))
                } else {
                  Event.findOneAndUpdate({_id:cur._id},{$set:{eventState:"stop"}})
                        .then(res => console.log("--stop--"))
                }
              })
            }
          })
       })
}

function updateVotedEvent(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  // left 5 days for vote
  let timeDifference1 = 5 * 60 * 60 * 24 * 1000
  let timeDifference2 = 4 * 60 * 60 * 24 * 1000

  Event.find({$and:
                [
                  {eventState:"vote"},
                  {created_at:{ $gte: curDateTime - timeDifference1,$lt:curDateTime - timeDifference2}}
                ]
             })
       .then((events) => {
        events.forEach(cur => {
          voteRes(cur._id).then(votes => {
            if(votes > 0){
              Event.findOneAndUpdate({_id:cur._id},{$set:{eventState:"apply"}})
                    .then(res => console.log("--apply--"))
            } else {
              Event.findOneAndUpdate({_id:cur._id},{$set:{eventState:"stop"}})
                    .then(res => console.log("--stop--"))
            }
          })
        })
      })
}

function voteRes(eventId){
  let voteRes = 0
  return(
    Vote.find({_event:eventId})
    .then(vots => {
      vots.map((vot, i) => {
        voteRes += vot.voted
      })
      return voteRes
    })
  ) 
}


// update attandenc of applicants
// update every mid-night
// ------------------------ working function -------------------------------
function updateAttendance(){
  findEvent()
    .then(events => {
      // if(!events){return}
      if(events){
        events.map((curEvent, i) => {
          countApplicants(curEvent._id)
            .then(numOfApplicants =>{
              if(numOfApplicants === 0){
                findAndUpdateAsgOrg(curEvent)
                  .then(updateOrg => {
                    console.log("-----update assigned orgnizer-6666666666-------")
                    console.log(updateOrg)
                    findAndUpdateTotalAssigned(curEvent, curEvent.reqpersons-1, updateOrg)
                    .then(res => {
                      console.log("------------update assigned participants------------------")
                      // return res
                    }) //
                  })
              }
              if(numOfApplicants > 0 && numOfApplicants < curEvent.reqpersons){
                if(numOfApplicants === 1){
                  findAndUpdateOrg(curEvent)
                    .then(res => {
                      console.log("-----generate oraginzer-777777777777-----")
                      console.log(res)
                      let participantIds = [res._user];
                      console.log(participantIds)
                      findAndUpdateLeftAssigned(curEvent, curEvent.reqpersons-numOfApplicants, participantIds)
                        .then(res => {console.log("-------*****--------")})
                    })
                } else {
                  findAndUpdateOrg(curEvent)
                    .then(org => {
                      console.log("-------update participant oragnizer--888888888---------")
                      console.log(org)
                      findAndUpdateParticipants(curEvent, numOfApplicants-1, org)
                      .then(participants => {
                        console.log("-------update participantIds--cccccccccccccccccccc---------")
                        console.log(participants)
                        let participantIds = []
                        participants.map(cur => {
                          participantIds.push(cur._user)
                        })
                        findAndUpdateLeftAssigned(curEvent, curEvent.reqpersons-numOfApplicants, participantIds)
                          .then(res => {
                            console.log("------------generate all participants---------")
                            // return res
                          })
                        })
                    })
                }
              }

              if(numOfApplicants >= curEvent.reqpersons){
                findAndUpdateOrg(curEvent)
                    .then(org => {
                      findAndUpdateParticipants(curEvent, numOfApplicants-1, org)
                    })
                    .then(participantIds => {
                      console.log("--------generate participants------")
                      // findAndUpdateLeftAssigned(curEvent, curEvent.reqpersons-numOfApplicants, participantIds)
                    })
              }
            })  
        })
      }
      return (events)
    })
}

// find events need to get participants
// update events state to process
function findEvent(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  // five days for date picker
  let timeDifference = 1 * 60 * 60 * 24 * 1000
  return (Event.find({$and: [{eventState:"apply"}, {applybefore:{$lte:curDateTime,$gt:curDateTime-timeDifference }}]})
          )
}

function countApplicants(eventId){
  return (Application.find({_event:eventId})
            .count()
            .exec()
            .then(total => {
              console.log("---work---");
              console.log(total);
              return total
            })
          )
}

function findAndUpdateAsgOrg(event){

  return (
    User.find({isActive:true, role:"parent"})
    .then(users => {
      let minHours = 555;
      let resUser;
      users.forEach(att => {
        if(att.aveHours < minHours){
        minHours = att.aveHours
        resUser = att._id
        }
      })
      return resUser
    })
    .then(resUserId => {
      console.log("-----assigned oragnizer id--------")
      console.log(resUserId)
      let org = new Attendence({
        _event:event._id,
        _user:resUserId,
        serviceHours:event.reqOrghours,
        isChecked:false,
        isShow:true,
        isDone:false,
        isCancel:false,
        tag:"assigned Org",
      })
       
      org.save();
      console.log(org)
      return org
    })
  )
}

// no applicants for this event
function findAndUpdateTotalAssigned(event, num, assignedOrg){
  return (
    User.find({$and:[{_id:{$ne:assignedOrg._user}},{isActive:true},{role:"parent"}]})
    .sort({aveHours:1})
    .limit(num)
    .then(usersDoc => {
      console.log("----------------------------assignedOrg._user------------------------------- ");
      console.log(assignedOrg._user)

      let userIdArr = [];
      usersDoc.map(curUser => {
        userIdArr.push({
          _event:event._id,
          _user:curUser._id,
          serviceHours:event.reqhours,
          isChecked:false,
          isShow:true,
          isDone:false,
          isCancel:false,
          tag:"assigned"})
      })
      return userIdArr
    })
    .then(userIds => {
      Attendence.create(userIds)
      .then(res => {
        console.log("--------generate assigned participants---------"); 
        let attendants = res.slice();
        attendants.push(assignedOrg)
        return attendants
      })
      .then(res =>{
        console.log("---------- generate finals assigned participants--------")
        console.log(res)
      })
    })
  )
}

function findAndUpdateOrg(event){
  return(
    Application.find({_event:event._id})
    .populate("_user")
    .then(applicants => {
      let minHours = 555;
      let resUser;
      applicants.forEach(att => {
        if(att._user.aveHours < minHours){
          minHours = att._user.aveHours
          resUser = att._user._id
        }
      })
      return resUser
    })
    .then(resUser => {
      console.log(event._id)
      org = new Attendence({
        _event:event._id,
        _user:resUser,
        serviceHours:event.reqOrghours,
        isChecked:false,
        isShow:true,
        isDone:false,
        isCancel:false,
        expectDate:resUser.expectDate,
        tag:"organize",
      })
      org.save()
      console.log("----------generate a participant oragnizer-------")
      console.log(org)
      return org
    })
  ) 
} 

function findAndUpdateParticipants(event, num, organizer){
  return(
    Application.find({$and:[{_event:event._id},{_user:{$ne:organizer._user}}]})
    .populate({
      path:"_user",
      options: { sort: { averhours: 1 } } 
    })
    .limit(num)
    .then(applicants =>{
     
      let newAttendants = [];
      // let newAttendantsId = [];
      applicants.map(applicant => {
        let newAtt = new Attendence({
          _event:event._id,
          _user:applicant._user._id,
          serviceHours:event.reqhours,
          isChecked:false,
          isShow:true,
          isDone:false,
          isCancel:false,
          expectDate:applicant.expectDate,
          tag:"participate"
        })
        newAtt.save()
        newAttendants.push(newAtt)
      })
      newAttendants.push(organizer)
      return newAttendants
    }) 
    .then(newAtt => {
        console.log("---&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&---")
        console.log(newAtt)
        return newAtt
    })
  )
}

function findAndUpdateLeftAssigned(event, num, participants){
  return(
    User.find({$and: [{_id:{$nin:participants}},{isActive:true},{role:"parent"}]})
    .sort({aveHours:1})
    .limit(num)
    .then(users => {
      let assignList = []
      users.map(user => {
        assignList.push({
          _event:event._id,
          _user:user._id,
          serviceHours:event.reqhours,
          isChecked:false,
          isShow:true,
          isDone:false,
          isCancel:false,
          tag:"assigned"
        })
      })
      return assignList
    })
    .then(res => {
      Attendence.create(res)
      .then(res =>{
        console.log("------generate assigned participants-------")
        // return table ----- Attedence -----
        let attendents = res.slice();
        attendents.concat(participants)
        
        return attendents
      })
      .then(res => {
        console.log("------- ultimate result of participants -------")
        console.log(res)
        return res
      })
    })
  )
}

function updateEventToPreProcess(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  // five days for date picker
  let timeDifference = 1 * 60 * 60 * 24 * 1000
  return (
    Event.updateMany(
      {
       eventState:"apply",
       applybefore:{$lte:curDateTime, $gt:curDateTime - timeDifference}
      },
      {$set:{eventState:"pre-process"}}, 
    ).then(res => console.log(res))
  )
}


// summary the date picker result
// consider there should be two same date picker
// left 10days to pick
function eventProcessDateChose(){
  let EventId = [];
  let applyEventId = [];
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  // five days for date picker
  let timeDifference1 = 10 * 60 * 60 * 24 * 1000
  let timeDifference2 = 11 * 60 * 60 * 24 * 1000
  EventSchedule.find(
                  // {isdone:false}
                  { $and:[{created_at:{ $lte: curDateTime - timeDifference1, $gt: curDateTime-timeDifference2}},{isdone:false}]
                  }
                )
               .then(eventsSchedule => {
                 console.log("---------------------------event schedule--------------------------")
                 console.log(eventsSchedule)
                
                 eventsSchedule.map((cur,i) => {
                 
                  let curEventId = cur._event;
                  let datePicker = 0;
                  let curStarted;
                  let curEnded
                  for(let i = 0; i < cur.expectedDates.length; i++){
                    if(cur.expectedDates[i].picker >= datePicker){
                      curStarted = cur.expectedDates[i].started
                      curEnded = cur.expectedDates[i].ended
                      datePicker = cur.expectedDates[i].picker
                    }
                  }
                  console.log(curStarted)
                  console.log(curEnded)
                  console.log(datePicker)
                  Event.findOneAndUpdate({_id:curEventId}, {$set:{started:curStarted, ended:curEnded, eventState:"process"}})
                        .then(res => {
                          console.log("------------------update event to process status-------------------")
                          console.log(res)
                    })
                 })
               })
}

function updateEventTimeScheToProcess(){
  let curDate = new Date();
  // let curDate = new Date();
  let curDateTime = curDate.getTime();
  // five days for date picker
  let timeDifference1 = 10 * 60 * 60 * 24 * 1000
  let timeDifference2 = 11 * 60 * 60 * 24 * 1000
  return (
    EventSchedule.updateMany(
      {
        created_at:{ $lte: curDateTime - timeDifference1, $gt: curDateTime-timeDifference2},
        isdone:false
      },
      {$set:{isdone:true}}, 
    )
    .then(res => console.log("update event sechedule status to done"))
    .catch(err => console.log(err))
  )
}

// update event state to finish
function updateEventStateToFinish(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  let timeDifference = 1 * 60 * 60 * 24 * 1000
  // let timeDifference = 2 * 60 * 60 * 24 * 1000
  Event.updateMany({ended:{ $gte: curDateTime - timeDifference, $le: curDateTime}, eventState:"process"}, {$set:{eventState:"finish"}})
       .then(res => {
         console.log("-----update event to finish------")
         console.log(res)
        })
        .catch(err => console.log(err))
}


function sendEmailofApply(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  let timeDifference1 = 1 * 60 * 60 * 24 * 1000;
  Event.find({eventState:{$in:["apply"]}, updated_at:{ $gte: curDateTime - timeDifference1}})
        .populate({
          path:"_creator",
          match:{role:"parent"}
        })
        .then(events => {
          console.log(events)
          User.distinct( "email")
          .then(emails => {
            events.map(curevent => {
              if(curevent._creator){
                let transporter = nodemailer.createTransport({
                  service: 'gmail',
                  port: 587,
                  secure: false,
                  requireTLS: true,
                  auth : {
                    user:process.env.EMAIL_NAME,
                    pass:process.env.EMAIL_PASSWORD
                  }
                });
                transporter.sendMail({
                  from:'Deutsch-Chinesischer Kindergarten',
                  to: emails,
                  subject:`The new task ${curevent.title} is created`,
                  html: `a new event is created, please login to ${curevent.eventState}, The ${curevent.eventState} link: <a href="${process.env.PAGE_URL}/events/detail/${curevent._id}">${process.env.PAGE_URL}/events/detail/${curevent._id}</a> `
                })
                 .then(userEmail => {console.log("------send apply email-----")})
                 .catch(err => {
                   console.log("----send email error-----")
                   console.log(err)
                  })
              }
            })
          })
        })
}

// after update eventstate(pre-process)
function sendEmailforOrg(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  let timeDifference1 = 1 * 60 * 60 * 24 * 1000;
  Event.find({eventState:"pre-process", updated_at:{ $gte: curDateTime - timeDifference1,$lt:curDateTime}})
       .then(events => {
         console.log("-----event-----")
         console.log(events)
         events.map(cur => {
           Attendence.find({_event:cur._id, tag:{$in:["organize", "assigned Org"]}})
                     .populate("_user")
                     .populate("_event")
                     .then(atts => {
                       console.log("----atts-----")
                       console.log(atts)
                      let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        port: 587,
                        secure: false,
                        requireTLS: true,
                       
                        auth : {
                          user:process.env.EMAIL_NAME,
                          pass:process.env.EMAIL_PASSWORD
                        }
                      });
                      transporter.sendMail({
                        from:'Deutsch-Chinesischer Kindergarten',
                        to: `${atts[0]._user.email}`,
                        subject:`you are chosen as ${atts[0].tag} of ${atts[0]._event.title}`,
                        html: `please login your account and choose possible task time slot.
                              The link is followed: <a href="${process.env.PAGE_URL}/person/eventDetail/${atts[0]._event._id}">${process.env.PAGE_URL}/person/eventDetail/${atts[0]._event._id}</a> `
                      })
                       .then(userEmail => {console.log("------pre process inform to organizer-------")})
                       .catch(err => {
                        console.log("----send email error-----")
                        console.log(err)
                     })
                  })
         })
         
       })
}

function sendEmailBeforProcess5(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  let timeDifference1 = 6 * 60 * 60 * 24 * 1000;
  let timeDifference2 = 4 * 60 * 60 * 24 * 1000;

  Event.find({eventState:{$in:["process"]}, started:{ $gte: curDateTime + timeDifference2, $lte: curDateTime + timeDifference1}})
        .then(events => {
          console.log(events)
          events.map(cur => {

            Attendence.find({_event:cur._id})
                      .populate("_user")
                      .then(atts => {
                        let emails = [];
                        atts.map(cur => {
                          emails.push(cur._user.email)
                        })
                        return emails
                      })
                      .then(emails => {
                        let transporter = nodemailer.createTransport({
                          service: 'gmail',
                          port: 587,
                          secure: false,
                          requireTLS: true,
                         
                          auth : {
                            user:process.env.EMAIL_NAME,
                            pass:process.env.EMAIL_PASSWORD
                          }
                        });
                        transporter.sendMail({
                          from:'Deutsch-Chinesischer Kindergarten',
                          to: emails,
                          subject:`The event ${cur.title} begin 5 days later`,
                          html: `the event begin 5 days later`
                        })
                         .then(userEmail => {console.log("------process inform 5 days before-------")})
                         .catch(err => {
                          console.log("----send email error-----")
                          console.log(err)
                        })
                      })
          })
        })
}

function sendEmailBeforProcess1(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  let timeDifference1 = 2 * 60 * 60 * 24 * 1000;

  Event.find({eventState:{$in:["process"]}, started:{ $gt: curDateTime, $lte: curDateTime + timeDifference1}})
        .then(events => {
          console.log(events)
          events.map(cur => {

            Attendence.find({_event:cur._id})
                      .populate("_user")
                      .then(atts => {
                        let emails = [];
                        atts.map(cur => {
                          emails.push(cur._user.email)
                        })
                        return emails
                      })
                      .then(emails => {
                        let transporter = nodemailer.createTransport({
                          service: 'gmail',
                          port: 587,
                          secure: false,
                          requireTLS: true,
                         
                          auth : {
                            user:process.env.EMAIL_NAME,
                            pass:process.env.EMAIL_PASSWORD
                          }
                        });
                        transporter.sendMail({
                          from:'Deutsch-Chinesischer Kindergarten',
                          to: emails,
                          subject:`The event ${cur.title} begin 1 days later`,
                          html: `the event begin 1 days later`
                        })
                         .then(userEmail => {console.log("------process inform 1 days before-------")})
                         .catch(err => {
                          console.log("----send email error-----")
                          console.log(err)
                        })
                      })
          })
        })
}

function sendEmailAfterProcessForOrg(){
  let curDate = new Date();
  let curDateTime = curDate.getTime();
  let timeDifference1 = 1 * 60 * 60 * 24 * 1000;
  Event.find({eventState:"finish", updated_at:{ $gte: curDateTime - timeDifference1}})
       .then(events => {
        console.log(events)
        events.map(cur => {

          Attendence.find({_event:cur._id, tag:{$in:["organize", "assigned Org"]}})
                    .populate("_user")
                    .then(atts => {
                      console.log("-------atts-----")
                      console.log(atts)
              
                      let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        port: 587,
                        secure: false,
                        requireTLS: true,
                       
                        auth : {
                          user:process.env.EMAIL_NAME,
                          pass:process.env.EMAIL_PASSWORD
                        }
                      });
                      transporter.sendMail({
                        from:'Deutsch-Chinesischer Kindergarten',
                        to: atts[0]._user.email,
                        subject:`The event ${cur.title} is finish`,
                        html: `please check the work hours for participants `
                      })
                       .then(userEmail => {console.log("------the event is finish-------")})
                       .catch(err => {
                        console.log("----send email error-----")
                        console.log(err)
                      })
                    })
        })
       })
}

// // update history total service information and personal service information
// var updateServiceEveryYear = schedule.scheduleJob('0 0 3 9 *', function(){
//   aveSevHY();
//   perSevHY();
// })



// // update event at vote state to apply or stop
// var updateEventStateAtVote = schedule.scheduleJob('30 22 * * *', function(){
//   new Promise(resolve => {
//     setTimeout(() => {
//       console.log('1', 'The first mission,should be done firs');
//       updateVotedEvent()
//       resolve(1);
//     }, 3000);
//   }).then((val) => {

//     new Promise(resolve => {
//       setTimeout(() => {
//         console.log('2', 'The second mission');
//         sendEmailofApply()
//         resolve(2);
//       }, 8000);
//     })
//   }) 
// })

// // update event at apply state to pre-process
// var updateEventStateAtApply = schedule.scheduleJob('30 23 * * *', function(){
//   new Promise(resolve => {
//   setTimeout(() => {
//     console.log('1', '我是第一个任务，必须第一个执行');
//     updateAttendance()
//     resolve(1);
//   }, 3000);
// })
// .then((val) => {

//   new Promise(resolve => {
//     setTimeout(() => {
//       console.log('2', '我是第二个任务');
//       updateEventToPreProcess()
//       resolve(2);
//     }, 8000);
//   })
//   .then((val) => {
//     new Promise(resolve => {
//       setTimeout(() => {
//         console.log("3", "我是第三个任务");
//         sendEmailforOrg()
//         resolve(3)
//       },8000)
//       })
//     })
//   })
// })


// // update event at pre-process state to process
// var updateEventStateAtApply = schedule.scheduleJob('30 0 * * *', function(){
//   new Promise(resolve => {
//     setTimeout(() => {
//       console.log('1', 'The first mission,should be done first');
//       eventProcessDateChose()
//       resolve(1);
//     }, 3000);
//   }).then((val) => {

//   new Promise(resolve => {
//     setTimeout(() => {
//       console.log('2', 'The second mission');
//       updateEventTimeScheToProcess()
//       resolve(2);
//       }, 8000);
//     })
//   })
// })


// //after process, inform orgnizer update task servicehours
// var updateEventstateAtProcess = schedule.scheduleJob('30 18 0 0 *', function(){

// // step8 after process, inform orgnizer update task servicehours
// new Promise(resolve => {
//   setTimeout(() => {
//     console.log('1', 'The first mission,should be done first');
//     updateEventStateToFinish()
//     resolve(1);
//   }, 3000);
// }).then((val) => {

// new Promise(resolve => {
//   setTimeout(() => {
//     console.log('2', 'The second mission');
//     sendEmailAfterProcessForOrg()
//     resolve(2);
//     }, 8000);
//   })
// })
// })

// var sendInformEmail = schedule.scheduleJob('30 18 0 0 *', function(){

//   // step6 send inform email to participants 5 days before the task is execute
//   sendEmailBeforProcess5()

//   // step7 send inform email to participants 1 days before the task is execute
//   sendEmailBeforProcess1() 
// })

module.exports = {
  isSepFirst,
  calChildNum,
  aveSevHY,
  perSevHY,
  voteRes,
  voteEventState,
  updateAttendance,
  countApplicants,
  findEvent,
  findAndUpdateAsgOrg,
  findAndUpdateTotalAssigned,
  findAndUpdateOrg,
  findAndUpdateParticipants,
  findAndUpdateLeftAssigned,
  updateAttendance,
  updateEventToPreProcess,
  eventProcessDateChose,
  updateEventTimeScheToProcess,
  sendEmailBeforProcess5,
  sendEmailBeforProcess1,
  updateVotedEvent,
  sendEmailofApply,
  sendEmailforOrg,
  sendEmailAfterProcessForOrg,
  updateEventStateToFinish
}