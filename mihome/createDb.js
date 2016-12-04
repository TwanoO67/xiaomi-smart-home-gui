var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

db.serialize(function() {
  db.run("CREATE TABLE xiaomi_log (id INTEGER PRIMARY KEY AUTOINCREMENT, date INTEGER, sid TEXT, model TEXT, data TEXT)");
});
