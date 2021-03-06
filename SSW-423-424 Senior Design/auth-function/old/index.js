const { TWILIO_SID, TWILIO_KEY, FROM_NUM } = require("./config");

const accountSid = TWILIO_SID;
const authToken = TWILIO_KEY;
const client = require("twilio")(accountSid, authToken);

const sendText = (body, number, callback) => {
  client.messages
    .create({
      body: body,
      from: FROM_NUM,
      to: number,
    })
    .then((message, error) => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
    });
};

// This is not valid syntax for a webhook, you can test locally with `node index.js` make sure you do npm install first!!!
const authHook = (number, callback) => {
  // Do regex to validate number
  if (false && !number.match(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
    callback("Error!")
  } else {
    const code = Math.random().toString(36).substring(4);
    const body = `Your verification code for Lilypad Journaling is: ${code}`;

    sendText(body, number, res => {
        callback(res ? "Works" : "Error!")
    });
  }
};

authHook("+19087637844", console.log)
