var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// set up a mongoose model
var userNodesSchema = new Schema({      
    user: {type: String},
    nodes: {type: [String]}
});

//buscar nodos por id
userNodesSchema.statics.findNodesByUser = function (email, cb) {
        this.find({user: new RegExp(email, 'i')}, cb);
    };

module.exports = mongoose.model('userNodes', userNodesSchema);