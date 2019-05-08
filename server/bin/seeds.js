const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

require('../configs/database')

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email:'zhliang0204@163.com',
    role:"admin",
  },

  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email:'zhliang0204@gmail.com',
    role:"parent",
    historyServiceHours:[{year:2016, serviceHours:24},{year:2017, serviceHours:33},{year:2018, serviceHours:42}],
    currentServiceHours: 11
  },

]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })