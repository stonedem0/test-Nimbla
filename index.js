const express = require('express');
const mongoose = require('mongoose')
const app = express();

require('dotenv').config()

const dbURI = process.env.MONGO_URI

if (!dbURI) {
    throw new Error('dbURI is equired!')
}

// Set up mongoose connection
mongoose.connect(dbURI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', _ => console.log('successfully connected to DB'));

app.listen('3000', _ => {
    console.log('hi, there')
})