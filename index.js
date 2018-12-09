const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const passport = require('passport')
const app = express();

require('dotenv').config()

require('./config.js/passport')

const dbURI = process.env.MONGO_URI

if (!dbURI) {
    throw new Error('db URI is equired!')
}

// Set up mongoose connection
mongoose.connect(dbURI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', _ => console.log('successfully connected to DB'));

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'));


require('./controllers/userRouter')(app);
require('./controllers/invoiceRouter')(app);



app.get('/', (req, res) => {
   res.render('invoice')
})

app.listen('3000', _ => {
    console.log('hi, there')
})