const express = require("express")
const passport = require('passport')
const User = require("../models/User")
const Child = require("../models/Child")


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

function createUser(user){

  const email = user.email;
  const username = user.username;
  const firstname = user.firstname;
  const lastname = user.lastname;

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
          role: "parent"}
      )
      return newUser.save()
    })
    .then(userSaved => {
      res.json( userSaved );
    })
    .catch(err => next(err))
}

module.exports = {
  createUser
}