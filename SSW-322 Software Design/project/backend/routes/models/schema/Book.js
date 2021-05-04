/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
	'bookID' : { type: String, default: '' },
	'title' : { type: String, default: '' },
	'isbn' : { type: String, default: '' },
	'isbn13' : { type: String, default: '' },
	'description' : { type: String, default: '' },
	'shortDescription' : { type: String, default: '' },
	'author' : { type: String, default: '' },
	'pages' : { type: Number, default: 0 },
	'imgURL' : { type: String, default: '' },
	'rate' : { type: Number, default: 0 },
	'numberOfRatings' : { type: Number, default: 0},
	'purchaseURL' : { type: String, default: ''}
});

module.exports = BookSchema;
