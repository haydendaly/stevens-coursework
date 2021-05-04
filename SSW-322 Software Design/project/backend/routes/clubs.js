/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

var express = require('express');
var router = express.Router();
let clubs = require('./clubs/main');

// Club functionality
router.post('/create', clubs.create);
// '/get' has optional query '?populate=true' that will populate the users and book objects rather than return IDs
router.get('/get/:clubID', clubs.get);
router.get('/delete/:clubID', clubs.delete);
router.post('/update/:clubID', clubs.update);

// User interactions
router.get('/join/:clubID/:userID', clubs.join);
router.get('/leave/:clubID/:userID', clubs.leave);
router.get('/updateProgress/:clubID/:userID/:progress', clubs.updateProgress);

module.exports = router;
