const User = require('../models/user')
const passport = require('passport')


module.exports = app => {

    app.get('/', (req, res) => {
        let message = req.flash('error')[0];
        res.render('signup', {message: message})
    })
    app.get('/login', (req, res) => {
        let message = req.flash('error')[0];
        res.render('login', {message: message})
    })
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/invoices',
        failureRedirect: '/login',
        failureFlash: 'wrong password or username'
    }))
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/invoices',
        failureRedirect: '/',
        failureFlash: 'username is taken'
    }))
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

}