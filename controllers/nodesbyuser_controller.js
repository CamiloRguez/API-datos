/**
 * Created by Camilo on 12/11/2016.
 */
var mongoose = require('mongoose');
var me;
var Noder = mongoose.model('Node');
var Usuario = mongoose.model('User');
var jwt = require('jwt-simple');
var config = require('../config/database'); // get db config file
var passport = require('passport');
var email;
//File: controllers/medida_controller.js
var userNodes = mongoose.model('userNodes');
var nodes;

//GET - Return a TVShow with specified ID
exports.findNodesByUser = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        Usuario.findOne({
            user: decoded.user
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).jsonp({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                /*NodeUser.findNodesByUser(user.email, function (err, nodesUser) {
                    if (err) return res.send(500, err.message);
                    console.log('GET /nodesUser/' + user.email);
                    console.log(nodesUser);
                    res.status(200).jsonp(nodesUser);
                });*/

                userNodes.find(function (err, _userNodes) {
                    if (err) res.send(500, err.message);
                    console.log(_userNodes);
                    us=_userNodes;
                    console.log('GET /medidas')
                    res.status(200).jsonp(us);
                });

            }
        });
    } else {
        return res.status(403).jsonp({ success: false, msg: 'No token provided.' });
    }
};

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};