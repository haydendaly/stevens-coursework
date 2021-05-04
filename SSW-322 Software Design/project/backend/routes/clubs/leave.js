/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;

var updateClub = async function (userID, clubID, callback) {
  modelDict.user.findOne({
    'userID' : userID
  }, {
    _id: 0
  }).then( result => {
    clubs = result.clubs;
    for (var i = 0; i < result.clubs.length; i++) {
      if (result.clubs[i] == clubID) {
        result.clubs.splice(i, 1);
        break;
      };
    };
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
  if(!req.params.clubID) {
    return res.status(400).send('Missing clubID')
  };
  if(!req.params.userID) {
    return res.status(400).send('Missing userID')
  };
  modelDict.club.findOne({
    "clubID" : req.params.clubID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      for (var i = 0; i < result.users.length; i++) {
        if (result.users[i].userID == req.params.userID) {
          result.users.splice(i, 1);
          break;
        };
      };
      modelDict.club.updateOne({
        "clubID" : req.params.clubID
      }, {
        "users" : result.users
      }, {
        _id : 0
      }).then(result => {
        if (result.n == 1) {
          updateClub(req.params.userID, req.params.clubID, function(data) {
            res.json(data)
          })
        } else {
          res.json(false)
        }
      }).catch(err => {
        res.status(500).json(err);
      })
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
