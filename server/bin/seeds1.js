const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })


// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const User = require("../models/User");
const AverageServiceHours = require("../models/AverageServiceHours")

const bcryptSalt = 10;

require('./../configs/database')

let historyServiceInfo = [
  {    
    year: "2015",
    childNum: 5,
    AveHours: 4.5,
    TotalHours: 22.5,
  },
  {    
    year: "2016",
    childNum: 11,
    AveHours: 7.3,
    TotalHours: 80.3,
  },
  {    
    year: "2017",
    childNum: 9,
    AveHours: 6,
    TotalHours: 54,
  },
  {    
    year: "2018",
    childNum: 3,
    AveHours: 4.5,
    TotalHours: 13.5,
  }

]

AverageServiceHours.deleteMany()
  .then(() => {
    return AverageServiceHours.create(historyServiceInfo)
  })
  .then(serviceHoursCreated => {
    console.log(`${serviceHoursCreated.length} history service information created with the following id:`);
    console.log(serviceHoursCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })