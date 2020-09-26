const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(({ res }) => res.status(404).sendFile(__dirname + '/public/404.html'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));