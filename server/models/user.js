//store the user information in user collection
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
      type: mongoose.Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email:mongoose.Schema.Types.String,
    phone:mongoose.Schema.Types.String

});

UserSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase();

    next();
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
