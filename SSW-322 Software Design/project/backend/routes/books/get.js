/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;
let getBook = require('../external/main').getBook;

module.exports = async function (req, res) {
  if(!req.params.bookID) {
    return res.status(400).send('Missing bookID');
  };
  modelDict.book.findOne({
    'bookID' : req.params.bookID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      res.json(result);
    } else {
      getBook(req.params.bookID, function(data) {
        var model = new modelDict.book(data);
        model.save(data)
        .then(result => {
          if (result != null) {
            res.json(result)
          } else {
            res.json(false);
          }
        }).catch(err => {
          res.status(500).json(err);
        });
      });
    };
  }).catch(err => {
    res.status(500).json(err);
  });
};
