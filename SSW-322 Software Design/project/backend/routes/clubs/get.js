/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;

var getUsers = async function (ids, callback) {
  modelDict.user.find({
    userID: { $in: ids }
  }, {
    _id: 0
  }).then(result => {
    callback(result);
  }).catch(err => {
    callback([]);
  });
}

var getBook = async function (id, callback) {
  modelDict.book.find({
    bookID: id
  }, {
    _id: 0
  }).then(result => {
    callback(result);
  }).catch(err => {
    res.status(500).json(err);
  });
}

module.exports = async function (req, res) {
  if(!req.params.clubID) {
    return res.status(400).send('Missing clubID');
  };
  modelDict.club.findOne({
    'clubID' : req.params.clubID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      if (!req.query.populate) {
          res.json(result);
      } else {
        getUsers(result.users, function(users) {
          result.users = users;
          getBook(result.bookID, function(book) {
            var response = {
              "clubID" : result.clubID,
              "bookID" : result.bookID,
              "users" : result.users,
              "start" : result.start,
              "end" : result.end,
              "book" : book
            }
            res.json(response);
          });
        });
      }
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err);
  });
}
