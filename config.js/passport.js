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

passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        const existingUser = await User.findOne({username: username});
        if (existingUser) {
            console.log(username)
            return done(null, existingUser);
        }
        const user = await new User({username: username, password: password}).save();
        console.log(`db ${user}`)
        done(null, user);
    } catch (err) {
        console.log('err', err)
        done(err, null);
    }
}));