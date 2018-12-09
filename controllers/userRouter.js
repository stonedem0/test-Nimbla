const User = require('../models/user')
const passport = require('passport')

module.exports = app => {
    app.get('/loginpage', (req, res) => {
        res.render('login')
    })
    app.post('/login', passport.authenticate('local', {successRedirect: '/invoices',
                               failureRedirect: '/loginpage'}))
     
}