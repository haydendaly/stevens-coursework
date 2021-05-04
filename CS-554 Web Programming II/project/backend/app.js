const express = require("express");
const app = express();
const configRoutes = require("./router/index");
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = app;
