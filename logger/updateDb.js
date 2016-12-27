var sqlite3 = require('sqlite3').verbose();
var path = require('path')
// specify current directory explicitly
var db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'database.db'));

db.serialize(function() {
  db.run("ALTER TABLE xiaomi_events ADD COLUMN comment TEXT");
  db.run("ALTER TABLE xiaomi_devices ADD COLUMN hide INTEGER");
});
