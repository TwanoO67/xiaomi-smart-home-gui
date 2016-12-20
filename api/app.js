var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');


var app = express();

// don't log request info during tests since it outputs to stdout and
// mixes in with the test results
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

//ajout des headers CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTION, PUT, GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

//ajout des routes pour chaque model
var fs = require('fs');
fs.readdirSync(__dirname+"/routes")
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var name = file.split('.js')[0];
    var routes = require('./routes/'+name);
    app.use('/'+name,routes);
  });

//ajout de la GUI (direct sur la home)
app.use(express.static(path.join(__dirname,'gui')))

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
