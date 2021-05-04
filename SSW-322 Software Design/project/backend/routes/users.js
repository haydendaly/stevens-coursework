/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

var express = require('express');
var router = express.Router();
let users = require('./users/main');

// User general
router.get('/get/:userID', users.get);
router.post('/create', users.create);
router.post('/update/:userID', users.update);
router.get('/doesExist/:userID', users.doesExist);
router.get('/delete/:userID', users.delete)

// User Clubs
router.get('/getClubs/:userID', users.getClubs);

// User token (for notifications)
router.get('/updateToken/:userID/:newToken', users.updateToken);

// Phone auth
router.get('/phoneAuth/:phoneNumber', users.phoneAuth);

module.exports = router;
