const bluebird = require('bluebird');
const flat = require('flat');
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const axios = require('axios');

const app = express();
const client = redis.createClient();
const baseURL = 'http://api.tvmaze.com/';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/* Get Shows List */
app.get('/', async (req, res, next ) => {
  let cachedShows = await client.getAsync('shows');
  if (cachedShows) {
    res.send(flat.unflatten(JSON.parse(cachedShows)));
  } else {
    next();
  }
});

app.get('/', async (req, res) => {
  try {
    const result = await axios.get(`${baseURL}shows`);
    await client.setAsync('shows', JSON.stringify(flat(result.data)));
    res.send(result.data);
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal Server Error', error });
  }
});

/* Get Show by ID */
app.get('/show/:id', async (req, res, next) => {
  const id = req.params.id;
  let cachedShow = await client.getAsync(`id-${id}`);
  if (cachedShow) {
    res.send(flat.unflatten(JSON.parse(cachedShow)));
  } else {
    next();
  }
});

app.get('/show/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await axios.get(`${baseURL}shows/${id}`);
    await client.setAsync(`id-${id}`, JSON.stringify(flat(result.data)));
    res.send(result.data);
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal Server Error', error });
  }
});

/* Search Shows */
app.post('/search', async (req, res, next) => {
  if (!(req.body.hasOwnProperty('searchTerm'))) res.status(500).send({ message: 'searchTerm not provided or invalid format.'})
  let cachedSearch = await client.getAsync(`search-${req.body.searchTerm}`);
  if (cachedSearch) {
    res.send(flat.unflatten(JSON.parse(cachedSearch)));
  } else {
    next();
  }
});

app.post('/search', async (req, res) => {
  try {
    const result = await axios.get(`${baseURL}search/shows/?q=${req.body.searchTerm}`);
    await client.setAsync(`search-${req.body.searchTerm}`, JSON.stringify(flat(result.data)));
    res.send(result.data);
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal Server Error', error });
  }
});

/* Popular Shows */
app.get('/popularsearches', async (req, res, next) => {
  res.send('pop searches');
});

app.get('*', ({ res }) => res.status(404).send({ message: 'Route not found' }))

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
