/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;

var getClubs = async function (ids, callback) {
  modelDict.book.find({
    bookID: { $in: ids }
  }, {
    _id: 0
  }).then(result => {
    callback(result);
  }).catch(err => {
    callback([]);
  })
}

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID');
  }
  modelDict.user.findOne({
    'userID' : req.params.userID
  }, {
    _id : 0
  }).then(userResult => {
    if (userResult != null) {
      modelDict.club.find({
        clubID: { $in: userResult.clubs }
      }, {
        _id: 0
      }).then(result => {
        if (req.query.homescreen) {
          var ids = []
          for (club in result) {
            ids.push(result[club].bookID)
          }
          getClubs(ids, (data) => {
            mutableList = []
            for (club in result) {
              result[club].book = data[club]
              mutableList.push({
                imgURL: data[club].imgURL,
                title: data[club].title,
                author: data[club].author,
                bookID: data[club].bookID,
                clubID: result[club].clubID
              })
            }
            res.json(mutableList)
          })
        } else {
          res.json(result)
        }
      }).catch(err => {
        res.status(500).json(err);
      })
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err);
  });
}
