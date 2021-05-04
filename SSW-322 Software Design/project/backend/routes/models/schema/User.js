/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	'userID' : { type: String, default: '' },
	'name' : { type: String, default: '' },
	'number' : { type: Number, default: 0 },
	'deviceID' : { type: String, default: '' },
	'clubs' : { type: Array, default: [] },
});

module.exports = UserSchema;
