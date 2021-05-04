const MongoClient = require("mongodb").MongoClient;
const settings = {
  mongoConfig: {
    serverUrl: process.env.MONGO_SERVER_URL ? process.env.MONGO_SERVER_URL : "mongodb://localhost:27017/",
    database: "SpotifyTwitter"
  },
};
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};
