const nodemailer = require('nodemailer')
const User = require('./models/User');
const Child = require('./models/Child')
const Event = require('./models/Event');
const Application = require('./models/Application');
const Final = require('./models/Final');
const AverageServiceHours = require("./models/AverageServiceHours");
const Attendence = require("./models/Attendence");
const ObjectId = require("mongoose").Types.ObjectId;

const {calChildNum,
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
  updateEventToPreProcess,
  eventProcessDateChose,
  updateEventTimeScheToProcess,
  updateVotedEvent,
  sendEmailofApply,
  sendEmailforOrg,
  sendEmailBeforProcess5,
  sendEmailBeforProcess1,
  sendEmailAfterProcessForOrg,
  updateEventStateToFinish
  // updateAttendance
} =require("./myschedule");



// test step
// step1:generate averageservicehours every semester year
// aveSevHY()

// step2:update user servicehours every semester year
// perSevHY()


// step3: update vote event to apply or stop
// new Promise(resolve => {
//   setTimeout(() => {
//     console.log('1', '我是第一个任务，必须第一个执行');
//     updateVotedEvent()
//     resolve(1);
//   }, 3000);
// }).then((val) => {

//   new Promise(resolve => {
//     setTimeout(() => {
//       console.log('2', '我是第二个任务');
//       sendEmailofApply()
//       resolve(2);
//     }, 8000);
//   })
// }) 


// step4:update apply event to pre-process
// new Promise(resolve => {
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
//     })
//   })
  
// })

// step5 update event to process
// new Promise(resolve => {
//   setTimeout(() => {
//     console.log('1', 'The first mission,should be done first');
//     eventProcessDateChose()
//     resolve(1);
//   }, 3000);
// }).then((val) => {

// new Promise(resolve => {
//   setTimeout(() => {
//     console.log('2', 'The second mission');
//     updateEventTimeScheToProcess()
//     resolve(2);
//     }, 8000);
//   })
// })



// step6 send inform email to participants 5 days before the task is execute
// sendEmailBeforProcess5()

// step7 send inform email to participants 1 days before the task is execute
// sendEmailBeforProcess1() 

// step8 after process, inform orgnizer update task servicehours
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

// step 9