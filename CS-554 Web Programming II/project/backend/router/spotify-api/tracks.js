/*
    Endpoints for retrieving information about one or more tracks from the Spotify catalog.

    Method and Endpoint             Usage:                            Returns:
    GET	/tracks/{id}	              Get a track 	                    track
    GET	/tracks	                    Get several tracks	              tracks

    https://developer.spotify.com/documentation/web-api/reference/tracks/
*/

const express = require("express");
const router = express.Router();
const redis = require('redis');
const client = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL) : redis.createClient();
const bluebird = require('bluebird')
const flatten = require('flat');
const unflatten = flatten.unflatten;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// Pull spotifyApi from authorization.js file
const spotifyApi = require('./authorization');


/*
  Obtain info about a track given the track ID.

  Optional Query Parameter:
    market: An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/tracks/{trackId}
*/
router.get('/:id', async (req, res) => {
    const trackID = req.params.id;
    const { access_token, market } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {};
    if (market) optQueryParams.market = market;

    const cacheKey = `spotify-api/tracks/${trackID}?${JSON.stringify(flatten(optQueryParams))}`;
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getTrack(trackID, optQueryParams).then(
            async (data) => {
                await client.setAsync(cacheKey, JSON.stringify(flatten(data.body)));
                res.json(data.body);
            },
            async (err) => {
                res.json(err);
            }
        );
    }
});

/*
  Obtain severeal tracks given multiple track IDs

  Required Query Parameter:
    ids:      A comma-separated list of the Spotify IDs for the tracks (Maximum=50)
  Optional Query Parameter:
    market:   An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/tracks?ids=3P4BLYkv74TfpBFsaY2IgU
*/
router.get('/', async (req, res) => {
    const { access_token, ids, market } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    if (!ids) return res.status(400).json({ error: 'Required query parameter \'ids\' not provided' });

    let optQueryParams = {};
    if (market) optQueryParams.market = market;

    const trackIDList = ids.split(',');

    const cacheKey = `spotify-api/tracks?${ids}&${JSON.stringify(flatten(optQueryParams))}`
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getTracks(trackIDList, optQueryParams).then(
            async (data) => {
                await client.setAsync(cacheKey, JSON.stringify(flatten(data.body)));
                res.json(data.body);
            },
            async (err) => {
                res.json(err);
            }
        );
    }

});


module.exports = router;