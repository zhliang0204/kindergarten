const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Disscussion = require('../models/Discussion');


const router = express.Router();

const { isLoggedIn } = require('../middlewares')

// Route to get all countries
router.post('/create', isLoggedIn, (req, res, next) => {
  let {eventname,started, ended,reqhours, reqpersons, content} = req.body;
  Event.create({eventname, started, ended, reqhours, reqpersons, content})
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

router.get('/', isLoggedIn, (req, res, next) => {
  Event.find({})
    .then(events => res.json(events))
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
  // User.findById(userId)
  //       .then(user =>{
  //         Event.findByIdAndUpdate(id, {
  //           $push: {discussion: {_userId:userId, userName:user.username, content:content}}
  //         })
  //       }).then(event =>{
  //         console.log('works:',id)
  //         res.json({success:true})
  //       })
  //         .catch(err => next(err))


  Event.findById(id) .then(event => {
    console.log("works:", id)
    res.json(event.data)
  })
  .catch(err => next(err))
})



module.exports = router;