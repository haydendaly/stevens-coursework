/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;
let getHomescreen = require('../external/main').getHomescreen;

module.exports = async function (req, res) {
  getHomescreen(function(data) {
    res.json(data);
  });
};
