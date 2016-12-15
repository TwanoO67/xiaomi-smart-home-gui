var models = require('./models');

module.exports = function(app, cb) {
  models.sequelize.sync().then(function() {
    var port = app.get('port');
    var server = app.listen(port, function() {
      if (typeof cb === 'function') { cb(server); }

      if (process.env.NODE_ENV !== 'test') {
        console.log('Server running on port ' + port);
      }
    })
  });
}
