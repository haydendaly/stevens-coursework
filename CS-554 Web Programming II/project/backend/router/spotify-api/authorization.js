// THIS DOESNT BELONG HERE!!! But for dev purposes keeping it here for now, move for deployment to hide keys/secret
// Refer to https://developer.spotify.com/documentation/web-api/reference/ for info about spotify's endpoints
// Refer to https://github.com/thelinmichael/spotify-web-api-node for info about the usage of the wrapper module for the spotify api that we are using
// -------------------------------------------------------------------
var SpotifyWebApi = require('spotify-web-api-node');

// Remember to change redirectUri for deployment
var spotifyApi = new SpotifyWebApi({
    clientId: 'd1f357b5e08e444682e89704869b769c',
    clientSecret: '898b527f70c84fa0b09d45bfbdbb4635',
    redirectUri: 'http://localhost:3000/'
});

// Pass the spofity user's access token from the frontend, it is hard-coded for now
spotifyApi.setAccessToken('BQADXWlA91eJftBKZCpYR1OD5s2-DqcOoJMsMKn676trRfpVVEbzerQ8-J-9Uh5Hb7dZnOEAYBhFiNal4GF3aDqlw4KsGguAqPqpy_rCwUJICoxdJ5Fu9uVxTmzV2l7tQo7ryWLLiCU6DKR76KU-CS9iNaHe3DtK1onFhmsk4luCQ99ZRRxDXKnGgd74f6obbRbEojLALKtgKUMQyQ');

module.exports = spotifyApi;
