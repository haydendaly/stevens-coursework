/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID');
  }
  modelDict.user.findOne({
    'userID' : req.params.userID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      res.json(true);
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err);
  });
}
