const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  // usernameField: 'username',
  usernameField: 'email',
  passwordField: 'password'
},
  (username, password, done) => {
  // (email, password, done) => {
    console.log("local user:", username)
    // User.findOne({ username })
    User.findOne({ email:username })

      .then(foundUser => {
        if (!foundUser) {
          done(null, false, { message: 'Incorrect email' });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, { message: 'Incorrect password' });
          return;
        }

        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));
