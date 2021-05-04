/*
    Endpoint for retrieving info about playlists

    Method and Endpoint             Usage:                                  Returns:
    GET /playlists/{id}             Get the authenticated user's profile    playlist

    https://developer.spotify.com/documentation/web-api/reference/playlists/
*/

const express = require("express");
const router = express.Router();

// Pull spotifyApi from authorization.js file
const spotifyApi = require('./authorization');


/*
    Obtain a playlist given the playlist ID

    Optional Query Parameters:
        fields:             Filters for the query. Comma-separated list of all fields to return.
                            Example: fields=description,url     See spotify docs for more
        market:             An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)
        additional_types:   Comma separated list of item types that your client supports besides the default 'track' type.
                            Valid types: track, episode.

    Endpoint structure example: localhost:3000/spotify-api/playlists/4E1oDZ0GGbGOPwKrpLLWWt?market=US
*/
router.get('/:id', async (req, res) => {
    const playlistID = req.params.id;
    const { access_token, fields, market, additional_types } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {};
    if (fields) optQueryParams.fields = fields;
    if (market) optQueryParams.market = market;
    if (additional_types) optQueryParams.additional_types = additional_types;

    spotifyApi.getPlaylist(playlistID, optQueryParams).then(
        (data) => {
            res.json(data.body);
        },
        (err) => {
            res.json(err);
        }
    );
});


/*
    Obtain full details of the tracks or episodes of a playlist given the playlist ID

    Optional Query Parameters:
        fields:             Filters for the query. Comma-separated list of all fields to return.
                            Example: fields=description,url     See spotify docs for more
        limit:              The maximum number of items to return. Default=100, Min=1, Max=100
        offset:             The index of the first item to return. Default=0
        market:             An ISO 3166-1 alpha-2 country code. Provide this parameter if you want to apply Track Relinking. (https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)
        additional_types:   Comma separated list of item types that your client supports besides the default 'track' type.
                            Valid types: track, episode.

    Endpoint structure example: localhost:3000/spotify-api/playlists/4E1oDZ0GGbGOPwKrpLLWWt/tracks?market=US&offset=100
*/
router.get('/:id/tracks', async (req, res) => {
    const playlistID = req.params.id;
    const { access_token, fields, limit, offset, market, additional_types } = req.query;

    if (!access_token) return res.status(400).json({ error: 'Required query parameter \'access_token\' not provided' });
    spotifyApi.setAccessToken(access_token);

    let optQueryParams = {};
    if (fields) optQueryParams.fields = fields;
    if (limit) optQueryParams.limit = limit;
    if (offset) optQueryParams.offset = offset;
    if (market) optQueryParams.market = market;
    if (additional_types) optQueryParams.additional_types = additional_types;

    spotifyApi.getPlaylistTracks(playlistID, optQueryParams).then(
        (data) => {
            res.json(data.body);
        },
        (err) => {
            res.json(err);
        }
    );
});

module.exports = router;