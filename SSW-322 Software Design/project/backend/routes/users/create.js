/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  var model = new modelDict.user(req.body);
  model.save(req.body)
  .then(result => {
    if (result != null) {
      res.json(true);
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err);
  });
}
