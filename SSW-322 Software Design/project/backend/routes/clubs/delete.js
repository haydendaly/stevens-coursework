/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.clubID) {
    return res.status(400).send('Missing clubID')
  }
  modelDict.club.remove({
    'clubID' : req.params.clubID
  }).then(result => {
    if (result.n == 1) {
      res.json(true);
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err);
  });
}
