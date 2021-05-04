const express = require("express");
const router = express.Router();
const redis = require('redis');
const client = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL) : redis.createClient();
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


/*
    Set the spotify refresh_token for the given user
    
    Required:
        refresh_token:    refresh token for the spotify api

    Endpoint structure: localhost:3000/refreshToken/set/{userId}?refresh_token=ubg3h904...
*/
router.post('/set/:userId', async (req, res) => {
    const userId = req.params.userId;

    const { refresh_token } = req.query;

    if (!refresh_token) return res.status(400).send({ error: 'Required query parameter \'refresh_token\' not provided' });

    await client.setAsync(
        `spotify-refresh-token-${userId}`,
        refresh_token,
        "EX",
        60 * 60
    ).then((result) => {
        if (result) {
            res.send(result);
        } else {
            res.status(500).send({ error: 'Failed to cache refresh_token' });
        }
    })

});


/*
    Get the spotify refresh_token for the given user

    Endpoint structure: localhost:3000/refreshToken/get/{userId}
*/
router.get('/get/:userId', async (req, res) => {
    const userId = req.params.userId;
    const isCached = await client.existsAsync(`spotify-refresh-token-${userId}`);

    if (isCached === 1) {
        const cachedData = await client.getAsync(`spotify-refresh-token-${userId}`);
        res.json({
            exists: true,
            refresh_token: cachedData
        });
    } else {
        res.json({
            exists: false
        })
    }

});

module.exports = router;