const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Application = require('../models/Application');
const Final = require('../models/Final');
// const Disscussion = require('../models/Discussion');


const router = express.Router();

const { isLoggedIn } = require('../middlewares')


router.get('/', isLoggedIn, (req, res, next) => {
  let userId = req.user.id;
  
  Final.find({ _userId:userId}).populate("_eventId")
    .then( finals => {
      res.json(finals)
    })
    .catch(err => next(err))
});

// router.post('/:id', isLoggedIn, (req, res, next) => {
//   let _eventId = req.params.id;
//   let username = req.user.username;
//   let _userId = req.user.id;
//   let serviceDate = req.body.serviceDate;



//   Application.create({_eventId, _userId,username, serviceDate}).then(application => {
//     // console.log(application)
//     // res.json(application)
//     Event.findOneAndUpdate({_id:_eventId}, {$push: {candidates:application._id}})
//     .then(event =>{res.json(application)})
//   })
//   .catch(err => next(err))
// })

module.exports = router;