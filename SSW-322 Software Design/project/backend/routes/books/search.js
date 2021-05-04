/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;
let searchBooks = require('../external/main').searchBooks;

module.exports = async function (req, res) {
  searchBooks(req.params.search, function(data) {
    res.json(data);
  });
};
