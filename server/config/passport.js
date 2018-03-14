const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');



module.exports = function ( passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
        (req, username, password, done) => {


          
          User.findOne({ 'username': username.toLowerCase() }, (err, user) => {
            if (err) {
              return done(err);
            }
            if (user) {
                
              return done(null, false);
            }

            console.log('after');
            const newUser = new User();

            newUser.username = username.toLowerCase();
            newUser.password = newUser.generateHash(password);
            newUser.email=req.body.email;
            newUser.phone=req.body.phone
            newUser.save((err, user) => {
              if (err) {
                throw err;
              }

              return done(null, newUser);
            });
          });
        }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
        (req, username, password, done) => {
          User.findOne({ 'username': username.toLowerCase() }, (err, user) => {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false);
            }
            if (!user.validPassword(password)) {
              return done(null, false);
            }
            return done(null, user);
          });
        }));
};
