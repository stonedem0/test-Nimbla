const User = require('../models/user')
const passport = require('passport')

module.exports = app => {
    app.get('/loginpage', (req, res) => {
        res.render('login')
    })
    app.post('/login', passport.authenticate('local-login'), (req, res) => {
        console.log('req.user', req.user)
        res.redirect('/invoices')
    })
    app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
        console.log('req.user', req.user)
        res.redirect('/invoices')
    })
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/loginpage');
    });

     
}