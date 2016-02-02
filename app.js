// http://code.runnable.com/U0sU598vXio2uD-1/example-reading-form-input-with-express-4-0-and-body-parser-for-node-js

var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var Tsugi = require('./tsugi');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/lti', upload.array(), function (req, res, next) {
  if ( Tsugi.validate(req, res) ) {
    console.log("SUCCESS!");
  }
  res.json(req.body);
});

app.get('/lti', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  Tsugi.mysql().then (function (rows){
     res.end('Expecting an LTI POST to this URL');
  }).catch(function (err){
     res.end('Tsugi Test Failed!');
  });
});

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  Tsugi.mysql().then (function (rows){
     res.end('Tsugi Test complete!')
  }).catch(function (err){
     res.end('Tsugi Test Failed!');
  });
});

console.log("Test mysql connection at http://localhost:3000");
console.log("Test oauth1 url=http://localhost:3000/lti key=12345 secret=secret");

app.listen(3000);
