const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const nocache = require('nocache')
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)

// const { updateServiceEveryYear,
//   updateEventStateAtVote,
//   updateEventStateAtApply,
//   updateEventstateAtProcess,
//   sendInformEmail,} = require('./cus_module/scheduleMission')

require('./configs/database')

const app_name = require('./package.json').name
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express()

app.use(nocache())


// Set "Access-Control-Allow-Origin" header
app.use(cors({
  origin: (origin, cb) => {
    cb(null, origin && origin.startsWith('http://localhost:'))
  },
  optionsSuccessStatus: 200,
  credentials: true
}))
app.use(logger('dev'))
app.use(bodyParser.json())
// org------
app.use(bodyParser.urlencoded({ extended: false }))
// change-----
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

// Set the public folder to "~/client/build/"
// Example: http://localhost:5000/favicon.ico => Display "~/client/build/favicon.ico"
app.use(express.static(path.join(__dirname, '../client/build')))


// Time Scheduled Mission
// updateServiceEveryYear;
// updateEventStateAtVote;
// updateEventStateAtApply;
// updateEventstateAtProcess;
// sendInformEmail;

// Enable authentication using session + passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'irongenerator',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 365},
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection,
    clear_interval: 1000 * 60 * 60 * 24 * 365
  })
}))
require('./passport')(app)



// app.use('/api', require('./routes/index'))
app.use('/api', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/child', require('./routes/child'))
app.use('/api/parent', require('./routes/parent'))
app.use('/api/mail', require('./routes/transportEmail'))
app.use('/api/user', require('./routes/user'))






// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// For any other routes, redirect to the index.html file of React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// Error handler
app.use((err, req, res, next) => {
  console.error("----- An error happened -----")
  console.error(err)

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500)

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === 'production')
      res.json(err)
    else
      res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))))
  }
})

module.exports = app
