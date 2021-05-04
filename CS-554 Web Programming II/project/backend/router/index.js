const post = require("./postRoute");
const user = require("./userRoute");
const login = require('./login')
const refreshTokenRoutes = require('./refreshToken')
const spotifyArtistsRoutes = require('./spotify-api/artists');
const spotifyAlbumsRoutes = require('./spotify-api/albums');
const spotifySearchRoutes = require('./spotify-api/search');
const spotifyUserRoutes = require('./spotify-api/users');
const spotifyMeRoutes = require('./spotify-api/me');
const spotifyPlaylistRoutes = require('./spotify-api/playlists');
const spotifyTracksRoutes = require('./spotify-api/tracks');

const constructorMethod = (app) => {
  app.use("/", login);
  app.use("/api/post", post);
  app.use("/api/user", user);
  app.use('/refreshToken', refreshTokenRoutes);
  
  app.use('/spotify-api/artists', spotifyArtistsRoutes);
  app.use('/spotify-api/albums', spotifyAlbumsRoutes);
  app.use('/spotify-api/search', spotifySearchRoutes);
  app.use('/spotify-api/users', spotifyUserRoutes);
  app.use('/spotify-api/me', spotifyMeRoutes);
  app.use('/spotify-api/playlists', spotifyPlaylistRoutes);
  app.use('/spotify-api/tracks', spotifyTracksRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });

}

module.exports = constructorMethod;
