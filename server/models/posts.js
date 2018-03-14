//store the user information in user collection
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username:  mongoose.Schema.Types.String,
    title: mongoose.Schema.Types.String,
    body : mongoose.Schema.Types.String,
    timestamp: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
      },
    
});


module.exports = mongoose.model('Post', PostSchema);