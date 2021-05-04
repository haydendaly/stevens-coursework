/*
  Endpoints for retrieving information about one or more albums from the Spotify catalog.
  
  Method and Endpoint             Usage:                          Returns:
  GET	/albums/{id}	              Get an Album	                  album
  GET	/albums/{id}/tracks	        Get an Album's Tracks	          tracks
  GET	/albums	                    Get Several Albums	            albums

  https://developer.spotify.com/documentation/web-api/reference/albums/
*/

// Example Album IDs:
// IIYMF: 31jHyTSpj8nWQgV45gvZA3
// FMB:   4G9ANFGk9579p2uirMbVT0

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
  Obtain info about an album given the album ID.

  Optional Query Parameter:
    market: An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/albums/{albumId}
*/
router.get('/:id', async (req, res) => {
    const albumID = req.params.id;
    const { access_token, market } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {};
    if (market) optQueryParams.market = market;

    const cacheKey = `spotify-api/albums/${albumID}?${JSON.stringify(flatten(optQueryParams))}`;
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getAlbum(albumID, optQueryParams).then(
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
  Obtain information about an album's tracks

  Optional Query Parameters:
    limit:    The number of album objects to return. Default=20, Min=1, Max=50
    offset:   The index of the first album to return. Default=0
    market:   An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/albums/{albumId}/tracks?offset=0&limit=20&market=US
*/
router.get('/:id/tracks', async (req, res) => {
    const albumID = req.params.id;
    const { access_token, limit, offset, market } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {}
    if (limit) optQueryParams.limit = limit;
    if (offset) optQueryParams.offset = offset;
    if (market) optQueryParams.market = market;

    const cacheKey = `spotify-api/albums/${albumID}/tracks?${JSON.stringify(flatten(optQueryParams))}`;
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getAlbumTracks(albumID, optQueryParams).then(
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
  Obtain severeal albums given multiple albums IDs

  Required Query Parameter:
    ids:      A comma-separated list of the Spotify IDs for the albums (Maximum=50)
  Optional Query Parameter:
    market:   An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)

  Endpoint structure example: localhost:3000/spotify-api/albums?ids=31jHyTSpj8nWQgV45gvZA3,4G9ANFGk9579p2uirMbVT0
*/
router.get('/', async (req, res) => {
    const { access_token, ids, market } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    if (!ids) return res.status(400).json({ error: 'Required query parameter \'ids\' not provided' });

    let optQueryParams = {};
    if (market) optQueryParams.market = market;
    
    const albumIDList = ids.split(',');

    const cacheKey = `spotify-api/albums?${ids}&${JSON.stringify(flatten(optQueryParams))}`
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getAlbums(albumIDList, optQueryParams).then(
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