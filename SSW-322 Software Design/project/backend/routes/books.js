/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

var express = require('express');
var router = express.Router();
let books = require('./books/main');

// Book functionality
router.get('/get/:bookID', books.get);
router.get('/doesExist/:bookID', books.doesExist);
router.get('/create/:bookID', books.create);
router.get('/search/:search', books.search);

// Get Homescreen
router.get('/getHomescreen', books.getHomescreen);

module.exports = router;
