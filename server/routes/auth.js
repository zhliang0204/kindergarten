const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.post("/signup", (req, res, next) => {
  // const { username, password, firstname, lastname, email, phone, address1, address2, postal, city, state, country,childname,role } = req.body
  const cur = { username, password,  email, phone,role } = req.body;
  console.log(cur)
  
  if (!username || !password) {
    res.status(400).json({ message: "Indicate username and password" })
    return
  }
  User.findOne({ username })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The username already exists" })
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      const newUser = new User({ username, password: hashPass, email, phone, role})
      return newUser.save()
    })
    .then(userSaved => {
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.json( userSaved );
      });
      
    })
    .catch(err => next(err))
})

router.post("/createUser", (req, res, next) => {
  // const { username, password, firstname, lastname, email, phone, address1, address2, postal, city, state, country,childname,role } = req.body
  const cur = { username, email, phone,role } = req.body;
  console.log(cur)
  
  // if (!username || !password) {
  if (!username) {

    res.status(400).json({ message: "Indicate username" })
    return
  }
  User.findOne({ username })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The username already exists" })
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(process.env.DEFAULT_PASSWORD, salt)
      const newUser = new User({ username, password: hashPass, email, phone, role})
      return newUser.save()
    }) .then(userSave => {
      res.json(userSave)


    })
    
    .catch(err => next(err))
})


router.post("/login", (req, res, next) => {
  const { username, password } = req.body

  // first check to see if there's a document with that username
  User.findOne({ username })
    .then(userDoc => {
      // "userDoc" will be empty if the username is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Incorrect username "))
        return
      }

      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Password is wrong"))
        return
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.password = undefined
        res.json(userDoc)
      })
    })
    .catch(err => next(err))
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        return
      }

      // We are now logged in (notice req.user)
      res.json(req.user)
    })
  })(req, res, next)
})

router.get("/logout", (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

module.exports = router
