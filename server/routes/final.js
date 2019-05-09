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


module.exports = router;