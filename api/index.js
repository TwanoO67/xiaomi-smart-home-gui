var app = require('./app');

var port = process.env.PORT || 3000;
app.set('port', port);

require('./server')(app);
