const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Disscussion = require('../models/Discussion');
// const Final = require("../models/Final");
const Application = require("../models/Application");
const Attendence = require("../models/Attendence");
const Child = require("../models/Child");
const AverageServiceHours = require("../models/AverageServiceHours");
const EventSchedule = require("../models/EventSchedule");
const ObjectId = require("mongoose").Types.ObjectId;


const router = express.Router();

const { isLoggedIn } = require('../middlewares');

// use for chart
// Route to get history service information
router.get('/history', isLoggedIn, (req, res, next) => {
  let id = req.user.id;
  console.log('--------work----------')
  console.log(id)

  User.findOne({_id:id})
      .then(result => {
        res.json(result.historyServiceHours)
      })
      .catch(err => next(err))
});

// Route to get current year service information, compare with total hours
router.get('/current', isLoggedIn, (req, res, next) => {
  let id = req.user.id;
  User.findOne({_id:id})
  .then(result => {
    output = {aveHours: result.aveHours, totalHours:result.totalHours}
    res.json(output)
  })
  .catch(err => next(err))
})


// user for calendar
// Route to get all events for one person
router.get("/all", isLoggedIn, (req, res, next) => {
  let userId = req.user._id;
  Attendence.find({$and:
   [
    {isDone:false},
    {_user:userId},
    {isShow:true}
   ]
  })
  .populate("_event")
  .populate({
    path:"_child",
    match:{"state":"stay"}
  })
  .then(events => {
    res.json(events)
  })
  .catch(err => next(err))
})

router.get("/all/process", isLoggedIn, (req, res, next) => {
  let userId = req.user._id;
  Attendence.find({$and :[{isDone:false},{_user:userId}]})
            .populate("_event")
            .then(attAndEvent => {
              res.json(attAndEvent)
            })
            .catch(err => next(err))
})

router.get("/all/finish", isLoggedIn, (req, res, next) => {
  let userId = req.user._id;
  Attendence.find({$and :[{isDone:true},{_user:userId}]})
            .populate("_event")
            .then(attAndEvent => {
              res.json(attAndEvent)
            })
            .catch(err => next(err))
})

// Route to get selected event (clicked on calendar)
router.get("/process/:id", isLoggedIn, (req, res, next) => {
  let userId = req.user._id;
  let eventId = req.params.id;
  Attendence.find({$and:[{_user:userId}, {_event:eventId}]})
            .populate({
              path:"_event",
              match:{"eventState":{$in:['pre-process','process','finish']}},
            })
            .then(attendants => {
              res.json(attendants)
            })
            .catch(err => next(err))
})

// route to choose 3 possible dates to work
router.post("/process/org/:id", isLoggedIn, (req,res,next) => {
  let userId = req.user._id;
  let datesInfo = req.body.datesInfo;
  let eventId = req.params.id;
  console.log(datesInfo)
  console.log(typeof(datesInfo))
  EventSchedule.create({
    _event: eventId,
    _creator: userId,
    isdone:false,
    expectedDates:datesInfo
  })
  .then(datesInfo => {
    Attendence.findOneAndUpdate({_user:userId, _event:eventId}, {$set:{isChecked:true}})
    .then(orgs => res.json(orgs))
  })
  .catch(err => next(err))
})

// route to choose 1 possible dates to work(participants)
router.post("/process/part/:id", isLoggedIn, (req, res, next) => {
  let eventId = req.params.id;
  Attendence.updateMany({_event:eventId, tag:{$in:["participate", "assigned"]}}, {$set:{isShow:true}})
            .then(atts => res.json(atts))
            .catch(err => next(err))
})

// route to update user infor of pick date
router.post("/process/datePick/part/:id", isLoggedIn, (req, res, next) => {
  let eventId = req.params.id;
  let userId = req.user._id;
  let selectDateKey = req.body.selectDateKey

  Attendence.findOneAndUpdate({_event:eventId, _user:userId}, {$set:{isChecked:true, expectDate:selectDateKey}})
            .then(atts => res.json(atts))
            .catch(err => next(err))
})

router.post("/process/datePickStatus/part/:id", isLoggedIn, (req, res, next) => {
  let eventId = req.params.id;
  let userId = req.user._id;
  let selectDateKey = req.body.selectDateKey;
  console.log("----test----")
  console.log(selectDateKey)
  EventSchedule.update({_event:eventId},{$inc:{[`expectedDates.${selectDateKey}.picker`]: 1}})
                .then(timeSchedule => {
                  res.json(timeSchedule)            
                })
                .catch(err => next(err))
})


// Route to get possible event date
router.get("/process/possibleDate/:id", isLoggedIn, (req,res,next)=> {
  let eventId = req.params.id;
  EventSchedule.find({$and: [{_event:eventId},{isdone:false}]})
               .then(eventshedule => {
                 res.json(eventshedule)
               })
               .catch(err => next(err))
})


// Route to get event finish process
router.get("/finish/event/:id", isLoggedIn, (req, res, next) => {
  let eventId = req.params.id;
  Attendence.find({_event:eventId, isDone:false})
            .populate({
              path:"_user",
              populate:{
                path:"_child",
                match:{"state":"stay"}
              }
            })
            .populate({
              path:"_event",
              match:{"eventState":"finish"},
            })
            .then(atts => {
              res.json(atts)
            })
})

router.post("/finish/event/:id", isLoggedIn, (req,res,next) => {
  let eventId = req.params.id;
  let updateInfo = req.body.updateInfo;
  updateInfo.map((cur) => {
    Attendence.findOneAndUpdate({_event:eventId, _user:cur._user}, {$set:{isDone:true, serviceHours:cur.serviceHours}})
              .then(atts => {
                console.log("---------------done-------------")
                console.log("-----------atts-----------------")
                // res.json(atts)
              })
              .catch(err => next(err))
  })
  return res.json({"finish":true})
})


// Route to update average service hours
router.post("/finish/updateService/:id", isLoggedIn, (req, res, next) => {
  let eventId = req.params.id;
  // let {totalHours} = req.body
  let today = new Date()
  let month = today.getMonth();
  let curyear
  if(month > 9){
    curyear = today.getFullYear();
  } else {
    // year = today.getFullYear() - 1;
    curyear = today.getFullYear() -1;

  }
  let resyear = curyear.toString()
  Attendence.aggregate([
    {$match: {_event:ObjectId(eventId)}},
    {$group : {
      _id:0,
      totalHours:{$sum:"$serviceHours"}
    }},
  ])
  .then(total => {
    console.log("-----total-----")
    console.log(total[0].totalHours)
    let totalH = total[0].totalHours
    
    AverageServiceHours.aggregate([ 
    {$match: { year:resyear}},
    {$project:
        { 
            _id: 1, 
            "TotalHours": {$add: ['$TotalHours', totalH]}, // add score by totaH
            "AveHours": {$add: ['$AveHours', {$divide: [totalH, "$childNum"]}]} // compute the new avg_field
        } 
    }
    ])
    .then(aver =>{
      console.log("-----total--average -- service -- hours-----")
      console.log(aver)
      AverageServiceHours.findOneAndUpdate({year:resyear},{TotalHours:aver[0].TotalHours,AveHours:aver[0].AveHours})
                          .then(service => {
                            console.log("------update service-----")
                            console.log(service)
                            res.json(service)
                          })
    });
  })
});


router.post("/finish/personalupdate/:id", isLoggedIn, (req, res, next) => {
  let eventId = req.params.id
 
  Attendence.find({_event:eventId})
    .then(finals => {
      finals.map(cur => {
        console.log("----------cur------------")
        console.log(cur)
        User.find({_id:cur._user})
            .then(userDoc => {
              console.log("---------------userDoc-----------------")
              console.log(userDoc)
              User.findOneAndUpdate({_id:cur._user},{$inc:{totalHours:cur.serviceHours, aveHours:cur.serviceHours/userDoc[0].childNum}})
              .then(user => {
                console.log("------user work hours update-----")
                console.log(user)
              })
            })
        
      })
    })
    return res.json({"success":true})
})

// Route to get event for oragnizer to check service hours
router.get('/finish/:id', isLoggedIn, (req, res, next) => {
  let userId = req.user._id;
  let eventId = req.params.id
  
  Final.find({ _userId:userId}).populate("_eventId")
    .then( finals => {
      res.json(finals)
    })
    .catch(err => next(err))
});

// Route to post final work hours for one event
// for oragnizer to judge the event
router.post("/checkService/:id", isLoggedIn, (req, res, next) => {
  // id: event id
  let eventId = req.params.id;
  let workhours = req.body.workhours;
  // workhours = {
    // {userId: ---, serviceHours:---},
    // {userId:---, serviceHours:---},
  // }
  Event.findOneAndUpdate({_id:eventId},{$set:{eventState: "finish"}})

  workhours.map((curPerson,i) => {
   Attendence.findOneAndUpdate({_event:id, _user:curPerson.userId}, {$set: {serviceHours:serviceHours}})
  //  count number of child whose state is stay
  //  
  //  const numOfChild = Child.find({$and: [{$or:[{_father:curPerson.userId},{_mother:curPerson.userId}]},{state:"stay"}]})
  const totalChild = Child.aggregate([
    {
      $match: {
        $and : [
          {$or : [{_father:curPerson.userId},{_mother:curPerson.userId}]},
          {state: "stay"}
        ],

      }
    },
    {$count: "numOfChild"}
  ])
  
  // update user work hours
  User.findOneAndUpdate({_id:curPerson.userId}, {$inc:{totalHours: curPerson.serviceHours, aveHours:parseFloate(curPerson.serviceHours/totalChild.numOfChild) }})
 })

})



module.exports = router;