const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })


// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const AverageServiceHours = require("../models/AverageServiceHours")

const bcryptSalt = 10;

require('./../configs/database')

let historyServiceInfo = [
  {    
    year: "2015",
    aveHours: 4.5,
    totalHours: 22.5,
  },
  {    
    year: "2016",
    aveHours: 7.3,
    totalHours: 80.3,
  },
  {    
    year: "2017",
    aveHours: 6,
    totalHours: 54,
  },

]

User.updateMany({role:"parent"}, {$set: {historyServiceHours:historyServiceInfo}})
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })