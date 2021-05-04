/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;
let getBook = require('../external/main').getBook;

var checkBook = async function(bookID, callback){
  modelDict.book.findOne({
    'bookID' : bookID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      callback(true);
    } else {
      callback(false);
    };
  }).catch(err => {
    res.status(500).json(err);
  });
};

module.exports = async function (req, res) {
  checkBook(req.params.bookID, function(doesExist) {
    if (doesExist) {
      res.json(false);
    } else {
      getBook(req.params.bookID, function(data) {
        var model = new modelDict.book(data);
        model.save(data)
        .then(result => {
          if (result != null) {
            res.json({
              'bookID' : result.bookID
            })
          } else {
            res.json(false);
          }
        }).catch(err => {
          res.status(500).json(err);
        });
      });
    };
  });
};
