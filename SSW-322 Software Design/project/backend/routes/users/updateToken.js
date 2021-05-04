/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID');
  }
  modelDict.user.updateOne({
    'userID' : req.params.userID
  }, {
    'deviceID' : req.params.newToken
  }, {
    _id : 0
  }).then(result => {
    if (result.n == 1) {
      res.json(true);
    } else {
      res.json(false);
    };
  }).catch(err => {
    res.status(500).json(err);
  });
};
