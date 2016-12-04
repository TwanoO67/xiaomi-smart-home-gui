var sqlite3 = require('sqlite3').verbose();
var path = require('path')
// specify current directory explicitly
var db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'database.db'));

db.serialize(function() {
  db.each("SELECT id,date,sid,model,data FROM xiaomi_log", function(err, row) {
      console.log(row.id + ": " + row.date + " " + row.sid + " " + row.model +" "+row.data);
  });
});
