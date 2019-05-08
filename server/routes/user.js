const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Disscussion = require('../models/Discussion');
const Final = require("../models/Final");
const Application = require("../models/Application")


const router = express.Router();

const { isLoggedIn } = require('../middlewares');



// Route to get all countries
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

router.get('/final', isLoggedIn, (req, res, next) => {
  let userId = req.user.id;
  
  Final.find({ _userId:userId}).populate("_eventId")
    .then( finals => {
      res.json(finals)
    })
    .catch(err => next(err))
});

router.get('/application', isLoggedIn, (req, res, next) => {
  let userId = req.user.id;

  Application.find({ _userId:userId}).populate("_eventId")
  .then( applications => {
    res.json(applications)
  })
  .catch(err => next(err))

})





module.exports = router;