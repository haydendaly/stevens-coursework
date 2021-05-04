/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;

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
  if(!req.params.clubID) {
    return res.status(400).json('Missing clubID');
  };
  if(!req.params.userID) {
    return res.status(400).json('Missing userID');
  };
  modelDict.club.findOne({
    'clubID' : req.params.clubID
  }, {
    _id : 0
  }).then(result => {
    modelDict.user.findOne({
      'userID' : req.params.userID
    }).then(userResult => {
      console.log(userResult)
      if (result != null) {
        var bool = true;
        for (elem in result.users) {
          if (req.params.userID == result.users[elem].userID) {
            bool = false
          }
        }
        if (bool) {
          result.users.push({
            userID: req.params.userID,
            progress: 0,
            name: userResult.name
          })
        }
        modelDict.club.updateOne({
          'clubID' : req.params.clubID
        }, {
          'users' : result.users
        }, {
          _id : 0
        }).then(result => {
          if (result.n == 1) {
            updateClub(req.params.userID, req.params.clubID, function(data) {
              res.json(data);
            });
          } else {
            res.json(false);
          }
        }).catch(err => {
          res.status(500).json(err);
        });
      } else {
        res.json(false);
      };
    })
  }).catch(err => {
    res.status(500).json(err)
  });
}
