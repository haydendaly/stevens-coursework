const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));

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
    // eslint-disable-next-line promise/always-return
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
    });
};

app.post('/auth', (request, response) => {
    if (!(request.body.number.length === 12)) { /* !request.body.number.match(/^\d{10}$/) */
      response.send("Error!")
    } else {
      const code = Math.floor(100000 + Math.random() * 899999);
      const body = `Your verification code for Lilypad Journaling is: ${code}`;

      sendText(body, request.body.number, res => {
          response.send(res ? { code } : { error: "Bug" })
      });
    }
});

exports.widgets = functions.https.onRequest(app);