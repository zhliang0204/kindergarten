const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Disscussion = require('../models/Discussion');
const Final = require('../models/Final');


const router = express.Router();

const { isLoggedIn } = require('../middlewares');
const { UpdateFinals } = require('../datapro');



router.post('/create', isLoggedIn, (req, res, next) => {
  let {eventname,started, ended,reqhours, reqpersons, content, applybefore} = req.body;
  Event.create({eventname, started, ended, reqhours, reqpersons, content, applybefore})
    .then(event => res.json(event))
    .catch(err => next(err))
});

router.get('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  Event.findOne({_id:id})
    .then(event => {
      res.json(event)
    })
    .catch(err => next(err))
});

router.get('/all/:id', isLoggedIn,(req,res,next) => {
  let id = req.params.id;
  Event.findOne({_id:id})
        .populate("candidates")
        .populate('discussion')
        .populate('finals')
        .exec()
        .then(event => {
          Final.findOne({_eventId:event._id})
                .then(res => {
                  if(res === null){
                    UpdateFinals(event);
                  }
                })
          res.json(event)
        })
        .catch(err => next(err))
})

router.get('/', isLoggedIn, (req, res, next) => {
  Event.find({})
    .then(events => {
      res.json(events.reverse())
    })
    .catch(err => next(err))
});

router.post('/discussions/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  let userId = req.user.id;
  let content = req.body.content;

  Event.findByIdAndUpdate(id, {
    $push: {discussion: {'_userId':userId, 'content':content} }
  }) .then(event => {
    console.log("works:", id)
    res.json({success: true})
  })
  .catch(err => next(err))
})

router.get('/discussions/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  let userId = req.user.id;
  let content = req.body.content;

  Event.findById(id) .then(event => {
    console.log("works:", id)
    res.json(event.data)
  })
  .catch(err => next(err))
})



module.exports = router;