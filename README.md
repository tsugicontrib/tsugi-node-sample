
Sample Tsugi Application For Node
=================================

**Under Contstruction:** This is just emerging test code to explore
how to approach a Tsugi (www.tsugi.org) implementation for Node.
For now the application and emergent Tsugi library code will all
be in this sample application repo.  As the Tsugi library code 
becomes more of a real library, the code will be refactored so the
Tsugi Node library can be distributed through npm.

Installation
------------

Check the code out and do

    npm install

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

    SUCCESS

Then change the secret to "secretx and launch again - you should 
sess this in the log:

    FAIL:Error: Invalid Signature


Updating when tsugi-node is changed in github
---------------------------------------------

    npm update

