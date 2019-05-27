const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")
const{ isLoggedIn } = require('../middlewares')
const Child = require("../models/Child")


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

function activeCodeGen(n){
  var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}

router.get("/allemails", (req, res,next) => {
  User.distinct("email")
      .then(emails => {
        res.json(emails)
      })
})

// create user of parent
router.post("/createParent", (req, res, next) => {
  const cur = { firstname, lastname, email, phone, childId, subrole } = req.body;
  const childA = [childId]
 
  if (!email || !firstname || !lastname) {
    res.status(400).json({ message: "Indicate username and email" })
    return
  }
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The email already exists" })
        return
      }
      // const salt = bcrypt.genSaltSync(bcryptSalt)
      // const hashPass = bcrypt.hashSync(email, salt)
      const acitiveCode = activeCodeGen(6)
      const newUser = new User(
        { 
          
          firstname:firstname,
          lastname:lastname,
          isActive:false,
          activeCode: acitiveCode, 
          email:email, 
          phone:phone, 
          _child:childA,
          role: "parent",
          subrole: subrole,
          childNum:1,
        }
      )
      return newUser.save()
    })
    .then(userSaved => {
      console.log("----------saved user-----------")
      console.log(userSaved)
      if(userSaved.subrole === "father"){
        console.log("--------------father-------------")
        Child.findOneAndUpdate({_id: childId}, {$set:{_father:userSaved._id}})
        .then(child => res.json(userSaved))
        .catch(err => next(err))
      } 
      if(userSaved.subrole === "mother"){
        console.log("--------------mother-------------")
        Child.findOneAndUpdate({_id: childId}, {$set:{_mother:userSaved._id}})
        .then(child => res.json(userSaved))
        .catch(err => next(err))
      }
      
      // res.json( userSaved );
    })
    .catch(err => next(err))
})

// route to relate child to parent
// to do--------------------------
router.post("/relateParent", (req, res, next) => {
  const { userId, childId } = req.body;
  User.update(
    {_id:userId},
    {
      $push:{_child:childId},
      $inc :{childNum:1},
    }
    )
    .then(userDoc => { res.json(userDoc)})
    .catch(err => next(err))
})

// left it to do next time.
router.post("/createTeacher", (req, res, next) => {
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
          res.status(409).json({ message: "Incorrect user" })
          // next(new Error("Incorrect user "))
          return
        }

        if(userDoc.email !== email){
          next(new Error("Incorrect email "))
          return
        }
        if(userDoc.isActive !== false){
          res.status(409).json({ message: "Account is already actived " })
          // next(new Error("Account is already actived "))
          return
        }
        User.findOneAndUpdate({_id: userId}, {$set:{isActive:true}}, {new: true})
            .then(updateUser => res.json(updateUser))
      }).catch(err => next(err))
})

router.post("/userActive", (req, res, next) => {
  
  const {email, activeCode} = req.body;
  User.findOne({$and:[{email: email}, {activeCode:activeCode}]})
      .then(userDoc => {
        if(!userDoc){
          next(new Error("Incorrect user "))
          return
        }

        if(userDoc.isActive !== false){
          next(new Error("Account is already actived "))
          return
        }
        User.update({$and:[{email: email}, {activeCode:activeCode}]}, {$set:{isActive:true}}, {new: true})
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
              // updateUser.password = null;
              console.log(updateUser)
              res.json(updateUser)
              
            }).catch(err => next(err))
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
