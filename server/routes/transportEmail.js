const express = require("express")
const passport = require('passport')
const router = express.Router()
// const User = require("../models/User")
const nodemailer = require('nodemailer')

const { isLoggedIn } = require('../middlewares')

router.post('/userMail', isLoggedIn, (req,res, next) => {
  let {email, username} = req.body;
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
    html: `<b>username: ${username}</b> <b>password: 1qaz2wsx</b><b>Link: <a href="http://localhost:3000/login">http://localhost:3000/login</a></b>`
  })
   .then(userEmail => res.json({success:true}))
   .catch(err => next(err))
})

module.exports = router











