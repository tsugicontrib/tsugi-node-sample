# tsugi-node-sample
The Sample Application for the Node.js version of Tsugi

Check the code out and do

    npm install

To download dependencies

Starting Node
-------------

I prefer to run this under nodemon so it auto resets when files are changed.

    npm install nodemon -g

Start the application as:

    nodemon app.js

Testing LTI
-----------

Go to https://online.dr-chuck.com/sakai-api-test/lms.php

Put in http://localhost:3000/lti as the launch URL

Launch the code - watching the node Console - it should be like this:

    Base String
    POST&http%3A%2F%2Flocalhost%3A3000%2Flti
       ... many lines of output
    OAuth    sig=l7K4WWDcGXCFVg7d2clsrEE4QrQ=
    Computed sig=l7K4WWDcGXCFVg7d2clsrEE4QrQ=
    OAuth  time=1454181418
    Actual time=1454181419
    SUCCESS!

Testing the MySQL code
----------------------

This is hard-coded to talk to port 8888 (i.e. MAMP). Make the database:

    CREATE DATABASE mjjs DEFAULT CHARACTER SET utf8;
    GRANT ALL ON mjjs.* TO 'mjjsuser'@'localhost' IDENTIFIED BY 'mjjspassword';
    GRANT ALL ON mjjs.* TO 'mjjsuser'@'127.0.0.1' IDENTIFIED BY 'mjjspassword';

Refresh the phpMyAdmin page, and mjjs now appears on the left.
Click on the mjjs database and then click on the SQL tab. 
Copy paste this command into the text box and hit go

    CREATE TABLE mjjs (name TEXT) ENGINE = InnoDB DEFAULT CHARSET=utf8;
    INSERT INTO mjjs (name) VALUES ('tsugi');

Navigate to http://localhost:3000 and watch the log it should look like this:

    The solution is:  [ { name: 'tsugi' } ]

Forked Version of oauth-sign
----------------------------

I needed access to the `generateBase()` method from the `oauth-sign` code.
So I forked the repo:

    https://github.com/request/oauth-sign

And made the one-line fix, and point to my fix in the `package.json`

I have sent a PR to the originating project.

    https://github.com/request/oauth-sign/pull/20


