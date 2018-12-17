const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const passport = require('passport')
const cookieSession = require('cookie-session');
const flash = require('connect-flash')
const app = express();

require('dotenv').config()
require('./config/passport')

//This URI I'll sent with mail
const dbURI = process.env.MONGO_URI
let localdb = 'mongodb://localhost:27017/myproject'

if (!dbURI) {
    throw new Error('db URI is equired!')
}

// Set up mongoose connection
mongoose.connect(localdb, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', _ => console.log('successfully connected to DB'));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
app.db = db;

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //This key I'll key with mail
    keys: [process.env.COOKIE_KEY]
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'));

require('./routers/userRouter')(app);
require('./routers/invoiceRouter')(app);

app.listen('3000', _ => {
    console.log('hi, there, listening on port 3000!');
})

module.exports = app