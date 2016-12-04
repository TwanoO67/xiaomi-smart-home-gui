var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/data/database.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS xiaomi_log (id INTEGER PRIMARY KEY AUTOINCREMENT, date INTEGER, sid TEXT, model TEXT, data TEXT)");
});
