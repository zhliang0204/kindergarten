const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")
const{ isLoggedIn } = require('../middlewares')
const Child = require("../models/Child")
const qs = require("qs")


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10


// only create child
router.post("/createChild", (req, res, next) => {
  const cur = { firstname, lastname, sex, age } = req.body;
  Child.create({
    firstname,
    lastname,
    sex,
    age
  })
    .then(newChild => {
      res.json(newChild)
    })
    .catch(err => next(err))
})

// list children
router.get("/all", (req, res, next) => {
  Child.find({})
    .populate("_parents")
    .then(children => {
      res.json(children)
    })
    .catch(err => next(err))
})

// list one child
router.get("/info/:id", isLoggedIn, (req, res, next) => {
  const childId = req.params.id;
  Child.find({_id:childId})
        .populate("_parents")
        .then(selectedchild => {
          res.json(selectedchild)
        })
        .catch(err => next(err))
})

// update a batch of child information
router.post("/all/graduate", isLoggedIn, (req, res, next) => {
  // childIds: string of ids,seperated by ,
  const childIds = req.body.childIds.split(",");
  console.log(childIds)
  const chi2 = [ '5cd7134b2854cf372417b2a4', '5cd716446da98a3c70e389e3' ]

  // an array list all childIds
  // not return the updated documents
  Child.updateMany({_id: {$in:childIds}}, {$set: {state:"stay"}})
            .then(children => {
              res.json(children)
            })
            .catch(err => next(err))
})

// update one childInformation



module.exports = router
