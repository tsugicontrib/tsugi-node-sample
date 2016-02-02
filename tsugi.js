
var $q = require ('q');

exports.version = "0.0.1";

exports.mysql = function() {

    var deferred = $q.defer();
    var mysql = require('mysql');
 
    var connection = mysql.createConnection({
        host     : 'localhost',
        port     : 8889,
        user     : 'mjjsuser',
        password : 'mjjspassword',
        database : 'mjjs'
    });

    connection.connect();
    connection.query('SELECT * from mjjs', function(err, rows, fields) {
        if (!err){
            deferred.resolve (rows);
            console.log('The solution is: ', rows);
        } else {
            deferred.reject(err);
            console.log('Error while performing Query.', err );
        }
    });
    connection.end();
    return deferred.promise;
}

exports.validate = function(req, res) {
    var params = req.body;
    if ( req.body.oauth_version != "1.0" ) {
        console.log("Nothing to see here");
        return false;
    }
    var received = params.oauth_signature;
    delete params.oauth_signature;
    for (var param in params) {
        console.log(param+'='+params[param]);
    }
    console.log('------');
    console.log('Sig='+received);
    console.log('req.url='+req.url);
    console.log('req.query='+req.query);
    var oas = require("oauth-sign");
    var Url = require('url');
    var url = Url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.url
    });
    console.log("url="+url);
    var url = Url.parse(url);
    console.log("url.href="+url.href);
    oas = require("oauth-sign");
    // TODO: Still need to do timestamp and nonce
    var base = oas.generateBase('POST', url.href, params);
    console.log("Base String");
    console.log(base);
    var computed =  oas.hmacsign("POST", url.href, params, "secret", '');
    console.log("OAuth    sig="+received);
    console.log("Computed sig="+computed);
    console.log("OAuth  time="+params.oauth_timestamp);
    console.log("Actual time="+Math.round(Date.now()/1000));
    return received == computed;
}
