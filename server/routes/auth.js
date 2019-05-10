const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")
const{ isLoggedIn } = require('../middlewares')
const Child = require("../models/Child")


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

// create user of parent
router.post("/createParent", (req, res, next) => {
  const cur = { firstname, lastname, username, email, phone, childId } = req.body;
  const childA = [childId]
 
  if (!username || !email || !firstname || !lastname) {
    res.status(400).json({ message: "Indicate username and email" })
    return
  }
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The email already exists" })
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(email, salt)
      const newUser = new User(
        { username:username, 
          firstname:firstname,
          lastname:lastname,
          isActive:false,
          activeCode: hashPass, 
          email:email, 
          phone:phone, 
          _child:childA,
          role: "parent"}
      )
      return newUser.save()
    })
    .then(userSaved => {
      Child.findOneAndUpdate({_id: childId}, {$push:{_parent:userSaved._id}})
      res.json( userSaved );
    })
    .catch(err => next(err))
})

// no use untill now
router.post("/createUser", (req, res, next) => {
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

router.post("/active/:id", (req, res, next) => {
  const userId = req.params.id;
  const email = req.body.email;
  User.findOne({_id: userId})
      .then(userDoc => {
        if(!userDoc){
          next(new Error("Incorrect user "))
          return
        }

        if(userDoc.email !== email){
          next(new Error("Incorrect email "))
          return
        }
        if(userDoc.isActive !== false){
          next(new Error("Account is already actived "))
          return
        }
        User.findOne({_id: userId}, {$set:{isActive:true}}, {new: true})
            .then(updateUser => res.json(updateUser))
      }).catch(err => next(err))
})

router.post("/setpws/:id", (req, res, next) => {
  const {email, password} = req.body

  User.findOne({email})
      .then(UserDoc => {
        if(!UserDoc){
          next(new Error("Incorrect email"))
          return
        }

        if(UserDoc.isActive === false){
          next(new Error("The account is not actived"))
          return
        }
        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)

        User.findOneAndUpdate({email}, {$set: {password: hashPass}}, {new: true})
            .then(updateUser => {
              updateUser.password = null;
              res.json(updateUser)
            })
        
      })
})

router.post("/login", (req, res, next) => {
  const { email, password } = req.body

  // first check to see if there's a document with that username
  User.findOne({ email })
    .then(userDoc => {
      // "userDoc" will be empty if the username is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Incorrect email "))
        return
      }

      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Password is wrong"))
        return
      }

      if (userDoc.isActive === false){
        next(new Error("The account is not actived"))
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
