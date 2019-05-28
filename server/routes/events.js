const express = require('express');
const ObjectId = require("mongoose").Types.ObjectId;
const User = require('../models/User');
const Event = require('../models/Event');
const Discussion = require('../models/Discussion');
const Application = require("../models/Application");
const Attendence = require('../models/Attendence');
const Vote = require('../models/Vote')
// const Final = require('../models/Final');


const router = express.Router();
const { isLoggedIn } = require('../middlewares');
// const { UpdateFinals } = require('../datapro');


router.post('/create', isLoggedIn, (req, res, next) => {
  let {title, description,started, ended,reqhours, reqpersons, applybefore} = req.body;
  let _creator = req.user._id;
  let isRequired = req.user.role === "parent" ? false:true;
  let eventState = isRequired === true? "apply":"vote";
  let reqOrghours = reqpersons === 1? reqhours: parseInt(reqhours) + 3; 

  Event.create({
    title,
    description,
    started,
    ended,
    reqhours,
    reqOrghours,
    reqpersons,
    applybefore,
    _creator,
    isRequired,
    eventState
  })
    .then(event => res.json(event))
    .catch(err => next(err))
});

// get one event with attende
// unreasonable
router.get('/info/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  Event.findOne({_id:id})
    .then(event => {
      res.json(event)
    })
    .catch(err => next(err))
});

//  get all events
router.get('/all', (req, res, next) => {
  Event.find({})
    .then(events => {
      res.json(events.reverse())
    })
    .catch(err => next(err))
});

// recommend participants
// recommend organizer first, then recommend participants


// vote for one event
router.post("/vote/:id", isLoggedIn, (req, res, next) => {
  // id:event id
  const userId = req.user._id;
  const eventId = req.params.id;
  const voted = req.body.voted;
  Vote.create({
    _user:userId,
    _event:eventId,
    voted:voted,
  })
  .then(voteDoc => {
    res.json(voteDoc)
  }).catch(err => next(err))
})

// get vote result of one user
router.get("/vote/personal/:id", isLoggedIn, (req, res, next) => {
  const userId = req.user._id
  const eventId = req.params.id
  Vote.find({_user: userId, _event:eventId})
      .then(voteRes => {
        res.json(voteRes)
      }).catch(err => next(err))
})

// count vote result
router.get("/vote/result/:id", isLoggedIn, (req, res, next) => {
  const eventId = req.params.id
  Vote.aggregate(
    [ 
      {
        $match: {_event: ObjectId(eventId)}
      },
      {
        $group : {
          _id: "$voted",
          total:{$sum : 1}
        }
      },
    ]
  ).then(voteCount => {
    res.json(voteCount)
  }).catch(err => next(err))
})

router.get("/vote/positive/result/:id", isLoggedIn, (req, res, next) => {
  const eventId = req.params.id
  Vote.find({_event:eventId, voted:1})
      .count()
      .then(voteCount => {
        res.json(voteCount)
      })
      .catch(err => next(err))
})

router.get("/vote/negtive/result/:id", isLoggedIn, (req, res, next) => {
  const eventId = req.params.id
  Vote.find({_event:eventId, voted:-1})
      .count()
      .then(voteCount => {
        res.json(voteCount)
      })
      .catch(err => next(err))
})


// get discussions
router.get("/discussion/:id", isLoggedIn, (req, res, next) => {
  const eventId = req.params.id;
  Discussion.find({_event:eventId})
            .populate({
              path: "_user",
              populate: {
                path:"_child",
                match: {state:"stay"}
              }
            })
            .then(discuss =>{
              res.json(discuss)
            })
            .catch(err => next(err))
})

router.post("/discussion/person/:id", isLoggedIn, (req, res, next) => {
  let eventId = req.params.id;
  // let username = req.user.username;
  let _userId = req.user.id;
  let content = req.body.content;

  Discussion.create({
    _event:eventId,
    _user:_userId, 
    content:content})
    .then(discuss => {
          res.json(discuss)
        }).catch(err => next(err))
})

// get applications
// two tables for application and participants
router.get("/application/:id", isLoggedIn, (req, res, next) => {
  // id: event id
  const eventId = req.params.id;
  Application.find({$and:[{_event:eventId},{isJoin:false}]})
            .populate({
              path: "_user",
              populate: {
                path:"_child",
                match: {state:"stay"}
              }
            })
            .then(attendants => {
              res.json(attendants)
            })
            .catch(err => next(err))
})

// post applications
// two tables for application and participants
router.post("/application/person/:id", isLoggedIn, (req, res, next) => {
  // id: event id
  const eventId = req.params.id;
  const userId = req.user._id;
  const { expectDate,serviceHours } = req.body;
  const username = req.user.username;
  Application.create({
    _event:eventId,
    _user:userId,
    expectDate:expectDate,
    serviceHours:serviceHours,
    isJoin:false,

  })
    .then(attendant => {
      res.json(attendant)
    })
    .catch(err => next(err))
})

router.get("/application/person/:id", isLoggedIn, (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.user._id;
  Application.find({$and:[{_event:eventId},{_user:userId}]})
              .then(applicant => res.json(applicant))
              .catch(err => next(err))
})

// get all attendant: org,par,assign,apply
router.get("/attendence/:id", isLoggedIn, (req, res, next) => {
  // id: event id
  const eventId = req.params.id
  Attendence.find({_event:eventId})
            .populate({
              path: "_user",
              populate: {
                path:"_child",
                match:{"state":"stay"}
              }
            })
            .then(attendants => {
              res.json(attendants)
            })
            .catch(err => next(err))
})




module.exports = router;