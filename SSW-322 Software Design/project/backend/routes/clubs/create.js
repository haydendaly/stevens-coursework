/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;
let getBook = require('../external/main').getBook;

var generateID = async function (callback) {
  var clubID = Math.random().toString(36).replace('0.', '').slice(0, 5);
  modelDict.club.findOne({
    'clubID' : clubID
  }).then(result => {
    if (result !== null) {
      generateID(function(result) {
        callback(result);
      });
    } else {
      callback(clubID);
    };
  });
};

var checkBook = async function(bookID, callback) {
  modelDict.book.findOne({
    'bookID' : bookID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      callback(result.title);
    } else {
      getBook(bookID, function(bookData){
        var model = new modelDict.book(bookData);
        model.save(bookData)
        .then(result => {
          if(result != null) {
            updateClub()
            callback(result.title);
          } else {
            callback(false);
          }
        });
      });
    };
  }).catch(err => {
    res.status(500).json(err);
  });
};

var updateClub = async function (userID, clubID, callback) {
  modelDict.user.findOne({
    'userID' : userID
  }).then( result => {
    clubs = result.clubs;
    clubs.push(clubID);
    modelDict.user.updateOne({
      'userID' : userID
    }, {
      'clubs' : clubs
    }, {
      _id : 0
    }).then(result => {
      if (result.n == 1) {
        callback(true);
      } else {
        callback(false);
      };
    }).catch(err => {
      callback(false);
    });
  }).catch(err => {
    callback(false);
  });
};

module.exports = async function (req, res) {
  generateID(function(clubID) {
    req.body.clubID = clubID;
    checkBook(req.body.bookID, function(title) {
      req.body.title = title;
      req.body.users = [{
        userID: req.body.userID,
        name: req.body.name,
        progress: 0
      }]
      var model = new modelDict.club(req.body);
      model.save(req.body)
      .then(result => {
        if(result != null) {
          updateClub(req.body.userID, clubID, function(data) {
            if (data) {
              res.json({
                "clubID" : clubID
              });
            } else {
              res.json(false);
            };
          });
        } else {
          res.json(false);
        };
      });
    });
  });
};
