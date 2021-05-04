/*
  Endpoint for searching through the Spotify catalog.
  
  Method and Endpoint             Usage:                Returns:
  GET /search        	          Search                search info

  https://developer.spotify.com/documentation/web-api/reference/search/search/
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
    For information about search query strings, refer to https://developer.spotify.com/documentation/web-api/reference/search/search/#writing-a-query---guidelines
*/


/*
    Obtain search info using the given query

    Required Parameters:
        q:          Search query keywords and optinal field filters and operators. See the link above for how to construct one.
                    Example: q=roadhouse%20blues
        type:       A comma-separated list of items types to search across
                    Vailid types: album, artist, playlist, track, show, episode
                    Example: q=name:abacab&type=album,track
    Optional Query Parameters:
        market:             An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)
        limit:              The number of results to return. Default=20, Min=1, Max=50 (The limit is applied within each type, not total reponse)
        offset:             The index of the first result to return. Default=0 (first result) Max=2000 (including limit) Use with limit to do pagination.
        include_external:   If include_external=audio is specified the response will include any relevant audio content that is hosted externally. 
                            By default external content is filtered out from responses.

    Endpoint structure example: http://localhost:3000/spotify-api/search?q=king%20gizzard&type=artist&market=US
*/
router.get('/', async (req, res) => {
    const { access_token, q, type, market, limit, offset, include_external } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    if (!q) return res.status(400).json({ error: 'Required query parameter \'q\' not provided' });
    if (!type) return res.status(400).json({ error: 'Required query parameter \'type\' not provided' });

    const typeList = type.split(',');

    let optQueryParams = {};
    if (market) optQueryParams.market = market;
    if (limit) optQueryParams.limit = limit;
    if (offset) optQueryParams.offset = offset;
    if (include_external) optQueryParams.include_external = include_external;

    const cacheKey = `spotify-api/search?${q}&${type}&${JSON.stringify(flatten(optQueryParams))}`
    const isQueryCached = await client.existsAsync(cacheKey);

    if (isQueryCached === 1) {
        const cachedData = await client.getAsync(cacheKey);
        const data = unflatten(JSON.parse(cachedData));
        res.json(data);
    } else {
        spotifyApi.search(q, typeList, optQueryParams).then(
            async (data) => {
                await client.setAsync(cacheKey,
                    JSON.stringify(flatten(data.body)),
                    "EX",
                    60 * 30);
                res.json(data.body);
            },
            async (err) => {
                res.json(err);
            }
        );
    }
});

module.exports = router;