
exports.version = "0.0.1";

/**
 * This is the launch class
 */
class Launch {
    /**
     * This is the constructor for the launch class.
     */
    constructor(req, res, provider, base) {
        var _req = req;
        var _res = res;
        var _provider = provider;
        var _base = base;
        this.req = function() { return _req; };
        this.res = function() { return _res; };
        this.provider = function() { return _provider; };
        this.base = function() { return _base; };
        this.complete = false;
        this.success = false;
    }
}

exports.setup = function(req, res) {
    lti = require('tsugi-node-lti/lib/ims-lti.js');

    // provider = new lti.Provider '12345', 'secret', [nonce_store=MemoryStore], [signature_method=HMAC_SHA1]
    provider = new lti.Provider ('12345', 'secret');
    x = provider.valid_request(req, req.body, function(x,y,z) { return [x,y,z];} );
    retval = new Launch(req, res, provider, x[2]);
    console.log(x);
    retval.complete = false;
    retval.success = x[1];
    retval.message = '';
    if ( ! retval.success ) {
        retval.message = x[0].message;
        returnUrl = req.body.launch_presentation_return_url
        if ( returnUrl ) {
            if ( returnUrl.indexOf('?') > 0 ) {
                returnUrl += '&';
            } else {
                returnUrl += '?';
            }
            returnUrl += 'lti_errormsg=' + encodeURIComponent(x[0].message);
            returnUrl += '&base_string=' + encodeURIComponent(x.base);
            console.log(returnUrl);
            res.redirect(returnUrl);
            retval.complete = true;
        }
    }
    return retval;
}

