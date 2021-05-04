/*
  Endpoints for retrieving information about one or more artists from the Spotify catalog.
  
  Method and Endpoint                   Usage:                            Returns:
  GET	/artists/{id}	                Get an Artist                     artist
  GET	/artists/{id}/albums	        Get an Artist's Albums            albums
  GET	/artists/{id}/top-tracks	    Get an Artist's Top Tracks        tracks
  GET	/artists/{id}/related-artists	Get an Artist's Related Artists	  artists
  GET	/artists	                    Get Several Artists	              artists

  https://developer.spotify.com/documentation/web-api/reference/artists/
*/

// Example Artist IDs
// King Gizz: 6XYvaoDGE0VmRt83Jss9Sn
// Elvis:     43ZHCT0cAZBISjO8DG9PnE

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
  Obtain info about an artist given their artist ID.
  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}
*/
router.get('/:id', async (req, res) => {
    const artistID = req.params.id;
    const { access_token } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    const cacheKey = `spotify-api/artists/${artistID}`;
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getArtist(artistID).then(
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
  Obtain the albums of a given artist given their artist ID.

  Optional Query Parameters:
    limit:          The number of album objects to return. Default=20, Min=1, Max=50
    offset:         The index of the first album to return. Default=0
    country:        An ISO 3166-1 alpha-2 country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
                    For example, for albums available in Sweden: country=SE
                    If not given, results will be returned for all countries and you are likely to get duplicate results per album, one for each country in which the album is available!
    include_groups: A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. 
                    Valid values are:
                    - album
                    - single
                    - appears_on
                    - compilation
                    For example: include_groups=album,single.

  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}/albums?offset=0&limit=20&country=US&include_groups=album,single
  Another example: localhost:3000/spotify-api/artists/43ZHCT0cAZBISjO8DG9PnE/albums?country=US for elvis
*/
router.get('/:id/albums', async (req, res) => {
    const artistID = req.params.id;
    const { access_token, limit, offset, country, include_groups } = req.query

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {}

    if (limit) optQueryParams.limit = limit;
    if (offset) optQueryParams.offset = offset;
    if (country) optQueryParams.country = country;
    if (include_groups) optQueryParams.include_groups = include_groups;

    const cacheKey = `spotify-api/artists/${artistID}/albums?${JSON.stringify(flatten(optQueryParams))}`;
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getArtistAlbums(artistID, optQueryParams).then(
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
  Obtain info about an artist given their artist ID.

  Required Query Parameter:
    country:        An ISO 3166-1 alpha-2 country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
  
  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}/top-tracks?country=US
*/
router.get('/:id/top-tracks', async (req, res) => {
    const artistID = req.params.id;
    const { country } = req.query;

    let optQueryParams = {};
    if (country) optQueryParams.country = country;

    const cacheKey = `spotify-api/artists/${artistID}/top-tracks?${JSON.stringify(flatten(optQueryParams))}`;
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getArtistTopTracks(artistID, optQueryParams).then(
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
  Obtain artists related to the artist given their artist ID.
  Endpoint structure example: localhost:3000/spotify-api/artists/{artistId}/related-artists
*/
router.get('/:id/related-artists', async (req, res) => {
    const artistID = req.params.id;

    const cacheKey = `spotify-api/artists/${artistID}/related-artists`;
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getArtistRelatedArtists(artistID).then(
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
  Obtain severeal artists given multiple artist IDs

  Required Query Parameter:
    ids: A comma=separated list of the Spotify IDs for the artists (Maximum=50)

  Endpoint structure example: localhost:3000/spotify-api/artists?ids=43ZHCT0cAZBISjO8DG9PnE,6XYvaoDGE0VmRt83Jss9Sn
*/
router.get('/', async (req, res) => {
    const { ids } = req.query;

    const artistIDList = ids.split(',');

    const cacheKey = `spotify-api/artists?${ids}`;
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.getArtists(artistIDList).then(
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