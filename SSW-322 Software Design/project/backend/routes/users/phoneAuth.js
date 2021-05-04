/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

const accountSid = require('../../private').ACCOUNT_SID;
const authToken = require('../../private').AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function codeGen(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

var sendText = (number, code, callback) => {
  client.messages.create({
     body: "Use " + code + " as your verification code for Atticus!",
     from: '+14243469443',
     to: number
   })
  .then((message, error) =>
    callback(code)
  ).catch( error => {
    callback(error)
  })
};

module.exports = async function (req, res) {
  if(!req.params.phoneNumber) {
    return res.status(400).send('Missing phoneNumber')
  }
  sendText(req.params.phoneNumber, codeGen(100000, 999999), function(code) {
    res.json({
      code: code
    });
  });
}
