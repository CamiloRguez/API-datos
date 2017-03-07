var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// set up a mongoose model
var Node = new Schema({      
    id: {type: String}
});

module.exports = mongoose.model('Node', Node);