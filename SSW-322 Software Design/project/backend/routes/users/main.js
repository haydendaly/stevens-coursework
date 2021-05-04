/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

// User general
module.exports.get = require('./get');
module.exports.create = require('./create');
module.exports.update = require('./update');
module.exports.doesExist = require('./doesExist');
module.exports.delete = require('./delete');

// User clubs
module.exports.getClubs = require('./getClubs');

// User token (for notifications)
module.exports.updateToken = require('./updateToken');

// Phone Auth
module.exports.phoneAuth = require('./phoneAuth');
