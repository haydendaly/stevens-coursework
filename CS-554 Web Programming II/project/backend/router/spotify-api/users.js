/*
    Endpoint for retrieving info about users.
  
    Method and Endpoint               Usage:                                  Returns:
    GET /users/{user_id}              Get a user's profile                    user

    https://developer.spotify.com/documentation/web-api/reference/users-profile/
*/

const express = require("express");
const router = express.Router();

// Pull spotifyApi from authorization.js file
const spotifyApi = require('./authorization');


/*
    Obtain info about the given user

    Endpoint structure example: localhost:3000/spotiy-api/users/boam123
*/
router.get('/:id', async (req, res) => {
    const userID = req.params.id;

    const { access_token } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    spotifyApi.getUser(userID).then(
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

    Endpoint structure example: localhost:3000/spotify-api/users/boam123/playlists?limit=1
*/
router.get('/:id/playlists', async (req, res) => {
    const userID = req.params.id;

    const { access_token, limit, offset } = req.query

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {};
    if (limit) optQueryParams.limit = limit;
    if (offset) optQueryParams.offset = offset;

    spotifyApi.getUserPlaylists(userID, optQueryParams).then(
        (data) => {
            res.json(data.body);
        },
        (err) => {
            res.json(err);
        }
    );
});

module.exports = router;