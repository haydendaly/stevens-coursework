/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var clubsRouter = require('./routes/clubs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/clubs', clubsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;

// I got bored so enjoy this Mandelbrot Fractal!
//                                        .o.
//                                      o8888o
//                                     d888888b
//                                     `Y8888P'
//                                 o .oood88booo. .o
//                           Ybo  .88888888888888888.
//                           "8888888888888888888888888b,
//                          .o88888888888888888888888888"
//                         Y88888888888888888888888888888b.
//                        .o8888888888888888888888888888888.
//                        8888888888888888888888888888888888
//         o, ,db, ,o    d8888888888888888888888888888888888[
//        .8888888888.   88888888888888888888888888888888888[
//       o888888888888b ]88888888888888888888888888888888888
//      d88888888888888o88888888888888888888888888888888888P
//  .o8o88888888888888888888888888888888888888888888888888"
// <8888888888888888888888888888888888888888888888888888K
//  "Y"88888888888888888888888888888888888888888888888888o
//     Y88888888888888"88888888888888888888888888888888888b
//      "888888888888" ]88888888888888888888888888888888888
//       '8888888888`   88888888888888888888888888888888888[
//        "` "YP" `"    "8888888888888888888888888888888888[
//                        888888888888888888888888888888888
//                        "8888888888888888888888888888888'
//                         d88888888888888888888888888888P'
//                           `"88888888888888888888888888o
//                            ,8888888888888888888888888P'
//                            dP"  "88888888888888888
//                                  " `"""Y88P"""' "'
//                                      .d8888b.
//                                      Y888888P
//                                       "8888"
//                                         `"'
