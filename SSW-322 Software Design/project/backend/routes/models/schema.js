/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

let mongoose = require('mongoose');
const USERS_URI = require('../../private').USERS_URI;
const BOOKS_URI = require('../../private').BOOKS_URI;
const CLUBS_URI = require('../../private').CLUBS_URI;

//Connecting to the databases
const Users = mongoose.createConnection(USERS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true
});
const Books = mongoose.createConnection(BOOKS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true
});
const Clubs = mongoose.createConnection(CLUBS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true
});

// Setting up schemas for all data types
const UserSchema = require('./schema/User');
const BookSchema = require('./schema/Book');
const ClubSchema = require('./schema/Club');

//Using certain collections within the database with their corresponding schemas
const UserModel = Users.model('Data', UserSchema, 'Data');
const BookModel = Books.model('Data', BookSchema, 'Data');
const ClubModel = Clubs.model('Data', ClubSchema, 'Data');

//Creating a dictionary of the datatype names and the models
const modelDict = {
  'user' : UserModel,
  'book' : BookModel,
  'club' : ClubModel
};

//Exporting model dictionary to be used within endpoints
module.exports.modelDict = modelDict;
