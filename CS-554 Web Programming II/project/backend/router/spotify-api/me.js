/*
    Endpoint for retrieving info about the current authenticated user

    Method and Endpoint             Usage:                                  Returns:
    GET /me       	                Get the authenticated user's profile    user
    GET /me/playlists               Get the authenticated user's playlists  playlists

    https://developer.spotify.com/documentation/web-api/reference/users-profile/
*/

const express = require("express");
const router = express.Router();

// Pull spotifyApi from authorization.js file
const spotifyApi = require('./authorization');


/*
    Obtain the current authenticated user's profile

    Endpoint structure: localhost:3000/spotify-api/me
*/
router.get('/', async (req, res) => {
    const { access_token } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    spotifyApi.getMe().then(
        (data) => {
            res.json(data.body);
        },
        (err) => {
            res.json(err);
        }
    );
});

/*
    Obtain the current authenticated user's playlists
    
    limit:    The number of playlist objects to return. Default=20, Min=1, Max=50
    offset:   The index of the first playlist to return. Default=0, Max=100.000

    Endpoint structure: localhost:3000/spotify-api/me/playlists
*/
router.get('/playlists', async (req, res) => {
    const { access_token, limit, offset } = req.query

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {};
    if (limit) optQueryParams.limit = limit;
    if (offset) optQueryParams.offset = offset;

    spotifyApi.getUserPlaylists(optQueryParams).then(
        (data) => {
            res.json(data.body);
        },
        (err) => {
            res.json(err);
        }
    );
});

/*
    Obtain the current user's top songs

    Endpoint structure: localhost:3000/spotify-api/me/top
*/
router.get('/top', async (req, res) => {
    const { access_token } = req.query

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {};
    optQueryParams.limit = 9;

    spotifyApi.getMyTopTracks(optQueryParams).then(
        (data) => {
            res.json(data.body);
        },
        (err) => {
            res.json(err);
        }
    );
});

module.exports = router;