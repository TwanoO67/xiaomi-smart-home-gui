var serve = require('koa-static');
var koa = require('koa');
var router = require('koa-router')();
var app = koa();

//Livraison static de la gui par koa-static
app.use(serve('gui'));

//connexion à mongoose
mongoUrl = '127.0.0.1:27017';
mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);
koaRestMongoose = require('koa-rest-mongoose');

//ajout de chaque model a l'api
var fs = require('fs');
fs.readdirSync(__dirname+"/mongo_models")
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var name = file.split('.js')[0];
    var model = require('./mongo_models/'+name)(mongoose);
    koaRestMongoose(app,router,model,"/api");
  });

app.listen(3000);

console.log('listening on port 3000');
