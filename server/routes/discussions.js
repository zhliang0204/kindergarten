const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
// const Disscussion = require('../models/Discussion');


const router = express.Router();

const { isLoggedIn } = require('../middlewares')


router.get('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  Event.findOne({_id:id})
    .then(event => {
      console.log("works")
      res.json(event)
    })
    .catch(err => next(err))
});

router.post('/:id', isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  let username = req.user.username;
  let _userId = req.user.id;
  let content = req.body.content;

// console.log("--------------discussion-----------------")
// console.log(username)
console.log(content)
let newdiscussion = {username,content, _userId};
// console.log(newdiscussion)

  Event.findOneAndUpdate({_id:id}, {
    $push: {discussion: newdiscussion
  }}) .then(event => {
    console.log(event)
    res.json(event)
  })
  .catch(err => next(err))
})

module.exports = router;