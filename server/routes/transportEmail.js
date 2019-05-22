const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")
const Attendence = require("../models/Attendence")
// const User = require("../models/User")
const nodemailer = require('nodemailer')


const { isLoggedIn } = require('../middlewares')

router.post('/userMail', isLoggedIn, (req,res, next) => {
  let {userId, email} = req.body;
  console.log(userId)
  console.log(email)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
   
    auth : {
      user:process.env.EMAIL_NAME,
      pass:process.env.EMAIL_PASSWORD
    }
  });
  transporter.sendMail({
    from:'Deutsch-Chinesischer Kindergarten',
    to: email,
    subject:"You are invited to parents group of Deutsch-Chinesischer Kindergarten",
    html: `Click Link to active your account: <b>Link: <a href="http://localhost:3000/active/${userId}">http://localhost:3000/active/${userId}</a></b>`
  })
   .then(userEmail => res.json({success:true}))
   .catch(err => next(err))
})

// create new event to inform every user
router.post('/createEventEmail', isLoggedIn, (req,res, next) => {
  let newevent = req.body.newevent;
  User.distinct( "email")
    .then(emails => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        requireTLS: true,
       
        auth : {
          user:process.env.EMAIL_NAME,
          pass:process.env.EMAIL_PASSWORD
        }
      });
      transporter.sendMail({
        from:'Deutsch-Chinesischer Kindergarten',
        to: emails,
        subject:`The new task ${newevent.title} is created`,
        html: `a new event is created, please login to ${newevent.eventState}, The ${newevent.eventState} link: <a href="http://localhost:3000/events/detail/${newevent.id}">http://localhost:3000/events/detail/${newevent.id}</a> `
      })
       .then(userEmail => res.json({success:true}))
       .catch(err => next(err))
    })
})

// router to inform participants to choose work time slot
router.post('/event/participant/timechoose/:id', isLoggedIn, (req,res, next) => {
  let eventId = req.params.id;
  Attendence.find({_event:eventId, tag:{$nin:["organize", "assigned Org"]}})
            .populate("_user")
            .populate("_event")
            .then(atts => {
              let email = []
              atts.map(cur => email.push(cur._user.email))

              let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                secure: false,
                requireTLS: true,
               
                auth : {
                  user:process.env.EMAIL_NAME,
                  pass:process.env.EMAIL_PASSWORD
                }
              });
              transporter.sendMail({
                from:'Deutsch-Chinesischer Kindergarten',
                to: email,
                subject:`The task ${atts[0]._event.title} is open to choose task time`,
                html: `Please login and choose one of possible time for this task.
                      The link is followed:<a href="http://localhost:3000/person/eventDetail/${atts[0]._event._id}">http://localhost:3000/person/eventDetail/${atts[0]._event._id}</a> `
              })
               .then(userEmail => res.json({success:true}))
               .catch(err => next(err))
            // })
            })
})

// router to inform participants the work has been finished and your work hours
router.post("/eventfinish/:id", isLoggedIn, (req, res, next) => {
  let eventId = req.params.id;
  Attendence.find({_event:eventId})
            .populate("_user")
            .populate("_event")
            .then(atts => {
              atts.map(cur => {
                let transporter = nodemailer.createTransport({
                  service: 'gmail',
                  port: 587,
                  secure: false,
                  requireTLS: true,
                 
                  auth : {
                    user:process.env.EMAIL_NAME,
                    pass:process.env.EMAIL_PASSWORD
                  }
                });
                transporter.sendMail({
                  from:'Deutsch-Chinesischer Kindergarten',
                  to: `${cur._user.email}`,
                  subject:`The task ${cur._event.title} is finished`,
                  html: `add ${cur.serviceHours} to your total`
                })
                 .then(userEmail => {
                  console.log("--------------userEmail-------------")
                  res.json({success:true})
                 } )
                 .catch(err => next(err))
              })
            })
})



module.exports = router











