process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
// const Invoice = require('../models/invoice');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testDBURL = process.env.TEST_MONGO_URI

require('dotenv').config()


const testSchema = new Schema({
    name: { type: String, required: true }
  });
 
  const Name = mongoose.model('Name', testSchema);
  describe('DB Tests', () => {
    before(function (done) {
      mongoose.connect(testDBURL);
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function() {
        console.log('successfully connected to test DB');
        done();
      });
    });
    describe('Test Database', function() {
      it('New name saved to test database', function(done) {
        var testName = Name({
          name: 'Mike'
        });
   
        testName.save(done);
      });
      it('Dont save incorrect format to database', function(done) {
        //Attempt to save with wrong info. An error should trigger
        var wrongSave = Name({
          notName: 'Not Mike'
        });
        wrongSave.save(err => {
          if(err) { return done(); }
          throw new Error('Should generate error!');
        });
      });
      it('Should retrieve data from test database', function(done) {
        //Look up the 'Mike' object previously saved.
        Name.find({name: 'Mike'}, (err, name) => {
          if(err) {throw err;}
          if(name.length === 0) {throw new Error('No data!');}
          done();
        });
      });
    });
    //After all tests are finished drop database and close connection
    after(function(done){
      mongoose.connection.db.dropDatabase(function(){
        mongoose.connection.close(done);
      });
    });
  });