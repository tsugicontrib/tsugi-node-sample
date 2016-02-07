
exports.version = "0.0.1";

exports.mysql = function() {

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
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });
    connection.end();
}

function Launch(req, res, provider, base) {
    var _req = req;
    var _res = res;
    var _provider = provider;
    var _base = base;
    this.req = function() { return _req; };
    this.res = function() { return _res; };
    this.provider = function() { return _provider; };
    this.base = function() { return _base; };
}

exports.setup = function(req, res) {
    lti = require('tsugi-node-lti-tmp/lib/ims-lti.js');

    // provider = new lti.Provider '12345', 'secret', [nonce_store=MemoryStore], [signature_method=HMAC_SHA1]
    provider = new lti.Provider ('12345', 'secret');
    x = provider.valid_request(req, req.body, function(x,y,z) { return [x,y,z];} );
    retval = new Launch(req, res, provider, x[2]);
    // console.log(x);
    retval.success = x[1];
    retval.message = x[0].message;
    return retval;
}

