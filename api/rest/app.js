var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var xiaomi_event_routes = require('./routes/xiaomi_event');

var app = express();

// don't log request info during tests since it outputs to stdout and
// mixes in with the test results
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());

app.use('/xiaomi_event', xiaomi_event_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }
  res.status(err.status || 500).end();
});

module.exports = app;
