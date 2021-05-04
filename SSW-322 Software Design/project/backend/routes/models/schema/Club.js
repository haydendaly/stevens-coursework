/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
	'clubID' : { type: String, default: '' },
	'bookID' : { type: String, default: '' },
	'users' : { type: Array, default: [] },
	'start' : {type: Number, default: Math.floor(new Date() / 1000)},
	'end' : {type: Number, default: Math.floor(new Date() / 1000) + 2592000 }
});

module.exports = ClubSchema;