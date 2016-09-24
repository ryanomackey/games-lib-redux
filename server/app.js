'use strict';

require('dotenv').config();
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressJwt = require('express-jwt');

var authenticate = require('./routes/authenticate');
var api = require('./routes/api');
var games = require('./routes/games');
var steam = require('./routes/steam');
var steamImport = require('./routes/steamImport');
var wishlist = require('./routes/wishlist');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/authenticate', authenticate);
app.use('/api', expressJwt({secret:process.env.SECRET}), api);
app.use('/games', expressJwt({secret:process.env.SECRET}), games);
app.use('/steam', steam);
app.use('/steamImport', expressJwt({secret:process.env.SECRET}), steamImport);
app.use('/wishlist', expressJwt({secret:process.env.SECRET}), wishlist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
