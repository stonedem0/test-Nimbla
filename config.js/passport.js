const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.serializeUser((user, done) => {
    console.log('user:', user)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User
        .findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use('local-login', new LocalStrategy(async function (username, password, done) {
    try {
        const existingUser = await User.findOne({username: username});
        if (existingUser && existingUser.validPassword(password)) {
            return done(null, existingUser);
        }
        console.log('wrong password')
    } catch (err) {
        console.log('err', err)
        done(err, null);
    }
}));

passport.use('local-signup', new LocalStrategy(async function (username, password, done) {
    try {
        const existingUser = await User.findOne({username: username});
        if (existingUser) {
            console.log('username is taken')
            return done(null, false);
        }
        const user = await new User();
        user.username = username;
        user.password = user.generateHash(password)

        user.save();
        console.log(`db ${user}`)
        done(null, user);
    } catch (err) {
        console.log('err', err)
        done(err, null);
    }
}));