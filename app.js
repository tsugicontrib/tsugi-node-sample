// http://code.runnable.com/U0sU598vXio2uD-1/example-reading-form-input-with-express-4-0-and-body-parser-for-node-js
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var Config = require('./Config.js');
let CFG = new Config();
var Tsugi = require('tsugi-node/src/Tsugi.js');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});


app.post('/lti', upload.array(), function (req, res, next) {
  console.log(req.body);
  let start = Tsugi.requireData(CFG, req, res);
  start.then( function(launch) {
console.log("APP LAUNCH");
    if ( launch.complete ) return;

    if ( launch.success ) {
      res.write('<pre>\n');
      res.write('Welcome to POST Tsugi on Node.js\n\n');
      res.write('Launch validated\n\n');
      console.log('SUCCESS');
      res.end("</pre>\n");
    } else {
      res.write('<pre>\n');
      res.write('POST Validation FAIL:'+launch.message+"\n");
      res.write("<p>\n");
      res.write('Base String:'+launch.base+"\n");
      res.write("</p>\n");
      console.log('FAIL:'+launch.message);
      console.log(launch.base);
      res.end("</pre>\n");
    }
  });
});

app.get('/lti', function (req, res, next) {
  console.log('GET to /lti');
  let start = Tsugi.requireData(CFG, req, res);
  start.then( function(launch) {
console.log("APP LAUNCH");
    if ( launch.complete ) return;

    if ( launch.success ) {
      res.write('<pre>\n');
      res.write('Welcome to GET Tsugi on Node.js\n\n');
      res.write('Launch validated\n\n');
      console.log('SUCCESS');
      res.end("</pre>\n");
    } else {
      res.write('<pre>\n');
      res.write('GET FAIL:'+launch.message+"\n");
      console.log('FAIL:'+launch.message);
      res.end("</pre>\n");
    }
  });
});
app.get('/lti', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Expecting an LTI POST to this URL');
})

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Tsugi Test complete!')
})

// Access the session as req.session
app.get('/sess', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

console.log("Test mysql connection at http://localhost:3000");
console.log("Test oauth1 url=http://localhost:3000/lti key=12345 secret=secret");
console.log("LTI test harness at https://online.dr-chuck.com/sakai-api-test/lms.php");

app.listen(3000);
