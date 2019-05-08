const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Discussion = require('../models/Discussion');


const router = express.Router();

const { isLoggedIn } = require('../middlewares')


router.get('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  Event.findOne({_id:id}).populate("discussion")
    .then(event => {
      console.log("works")
      res.json(event.discussion)
    })
    .catch(err => next(err))
});

router.post('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  let username = req.user.username;
  let _userId = req.user.id;
  let content = req.body.content;

  Discussion.create({username, _userId, content})
    .then(discuss => {
        Event.findOneAndUpdate({_id:id}, {
          $push: {discussion:discuss._id}
        }).then(event => {
          // console.log(event)
          res.json(discuss)
        }).catch(err => next(err))
    })
})

module.exports = router;