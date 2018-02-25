const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy(
        {
            // Strategy options
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        (accessToken, refreshToken, profile, done) => {
            // check if user already exist in our db
            User.findOne({ googleId: profile.id }).then(currentUser => {
                if (currentUser) {
                    // user exist
                    console.log('user is: ', currentUser);
                } else {
                    // user not found so we create new one
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    })
                        .save()
                        .then(newUser => {
                            console.log('new user created: ' + newUser);
                        });
                }
            });
        }
    )
);
