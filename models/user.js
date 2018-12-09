const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs')
const userSchema = new Schema({ 
  username: String,
  password: String
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  if(this.password != null) {
      return bcrypt.compareSync(password, this.password);
  } else {
      return false;
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User