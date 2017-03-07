/**
 * Created by Camilo on 12/11/2016.
 */
var mongoose = require('mongoose');
var Medida  = mongoose.model('Medida');
var Finca  = mongoose.model('Finca');
var finca_id;
var me;

var Usuario  = mongoose.model('User');
var jwt         = require('jwt-simple');
var config      = require('../config/database'); // get db config file
var passport	= require('passport');

exports.findMedidaByCliente = function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        Usuario.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).jsonp({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                //res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
                Finca.findFincaByCliente(req.params.id, function(err, finca) {
                    if(err) return res.send(500, err.message);
                    console.log('GET /fincaByCliente/' + req.params.id);
                    //console.log(finca[0]["id"]);
                    finca_id = finca[0]["id"];
                    console.log(finca_id);

                    Medida.findMedidaByFinca(finca_id,function (err, medida) {
                        if(err) return res.send(500, err.message);
                        console.log('GET /medidaByFinca/' + finca_id);
                        console.log(medida);
                        me=medida;
                        console.log("me "+me);
                        res.status(200).jsonp(me);
                    })

                    //res.status(200).jsonp(finca);
                });
            }
        });
    } else {
        return res.status(403).jsonp({success: false, msg: 'No token provided.'});
    }









    //Medida.findMedidaByFinca(res,res);

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

