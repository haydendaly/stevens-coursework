const bluebird = require('bluebird');
const flat = require('flat');
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const axios = require('axios');
const handlebars = require('express-handlebars');

const app = express();
const client = redis.createClient();
const baseURL = 'http://api.tvmaze.com/';

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/* Get Shows List */
app.get('/', async (req, res, next ) => {
  let cachedShows = await client.getAsync('shows');
  if (cachedShows) {
    res.send(cachedShows);
  } else {
    next();
  }
});

app.get('/', async (req, res) => {
  try {
    let { data } = await axios.get(`${baseURL}show`);
    res.render('list', { layout: 'index', data, listExists: true, type: 'All Shows' }, async (err, html) => {
      await client.setAsync('shows', html);
      res.send(html);
    });
  } catch (error) {
    console.log(error)
    res.status(500).render('backup', { layout: 'index', message: '500: Internal Server Error' })  }
});

/* Get Show by ID */
app.get('/show/:id', async (req, res, next) => {
  let id = req.params.id;
  let cachedShow = await client.getAsync(`id-${id}`);
  if (cachedShow) {
    res.send(cachedShow);
  } else {
    next();
  }
});

app.get('/show/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    let result = await axios.get(`${baseURL}shows/${id}`);
    res.render('single', { layout: 'index', data: result.data }, async (err, html) => {
      await client.setAsync(`id-${id}`, html);
      res.send(html);
    });
  } catch (error) {
    res.status(404).render('backup', { layout: 'index', message: '404: Not Found' });
  }
});

/* Search Shows */
app.post('/search', async (req, res, next) => {
  req.body = JSON.parse(JSON.stringify(req.body));
  if (!(req.body.hasOwnProperty('searchTerm'))) {
    res.status(500).render('backup', { layout: 'index', message: '500: No searchTerm Field Provided' });
  } else if (req.body.searchTerm.replace(/ /g, "").length == 0) {
    res.status(500).render('backup', { layout: 'index', message: '500: Search Must Contain More Than Just Spaces' });
  } else {
    let cachedSearch = await client.getAsync(`search-${req.body.searchTerm}`);
    if (cachedSearch) {
      await client.zincrby('searches', 1, req.body.searchTerm);
      res.send(cachedSearch);
    } else {
      next();
    }
  }
});

app.post('/search', async (req, res) => {
  try {
    let result = await axios.get(`${baseURL}search/shows/?q=${req.body.searchTerm}`);
    let data = result.data.map(o => o.show);
    await client.zadd('searches', 1, req.body.searchTerm);
    res.render('list', {layout: 'index', data, listExists: data.length > 0, type: `Search Results for '${req.body.searchTerm}'`}, async (err, html) => {
      await client.setAsync(`search-${req.body.searchTerm}`, html);
      res.send(html);
    });
  } catch (error) {
    console.log(error)
    res.status(500).render('backup', { layout: 'index', message: '500: Internal Server Error' })
  }
});

/* Popular Shows */
app.get('/popularsearches', async (req, res, next) => {
  await client.zrevrange('searches', 0, 9, (err, data) => {
    res.render('popSearches', { layout: 'index', data: data.map(o => ({ name: o })), listExists: data.length > 0 });    
  });
});

app.get('*', ({ res }) => res.status(404).render('backup', { layout: 'index', message: '404: Not Found' }));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
