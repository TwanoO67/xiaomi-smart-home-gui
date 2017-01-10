const dgram = require('dgram');
const serverPort = 9898;
const serverSocket = dgram.createSocket('udp4');
const multicastAddress = '224.0.0.50';
const multicastPort = 4321;
var sidToAddress = {};
var sidToPort = {};

var sqlite3 = require('sqlite3').verbose();
var path = require('path');
// specify current directory explicitly
var db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'database.db'));

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS xiaomi_events (id INTEGER PRIMARY KEY AUTOINCREMENT, date INTEGER, comment TEXT, sid TEXT, model TEXT, cmd TEXT,data TEXT, createdAt INTEGER, updatedAt INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS xiaomi_devices (sid TEXT PRIMARY KEY, name TEXT, model TEXT, hide INTEGER, createdAt INTEGER, updatedAt INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS xiaomi_heartbeats (id INTEGER PRIMARY KEY AUTOINCREMENT, sid TEXT, model TEXT, data_type TEXT, is_last_state INTEGER, data TEXT, interval_begin_date INTEGER, interval_end_date INTEGER, last_heartbeat_date INTEGER, createdAt INTEGER, updatedAt INTEGER)");
});

var event_log_insert = db.prepare("INSERT INTO xiaomi_events (date,sid,model,cmd,data,createdAt) VALUES (?,?,?,?,?,strftime('%s','now'))");
var device_insert = db.prepare("INSERT OR IGNORE INTO xiaomi_devices (sid,name,model,createdAt) VALUES (?,?,?,strftime('%s','now'))");
var device_update_model = db.prepare("UPDATE xiaomi_devices SET model = ?, updatedAt = strftime('%s','now') WHERE sid = ?");
var interval_begin = db.prepare("INSERT INTO xiaomi_heartbeats (sid,model,data,interval_begin_date,last_heartbeat_date,data_type,is_last_state,createdAt) VALUES (?,?,?,?,?,?,1,strftime('%s','now'))");
var interval_update_hb = db.prepare("UPDATE xiaomi_heartbeats SET last_heartbeat_date=? , updatedAt = strftime('%s','now') WHERE id=?");
var interval_end = db.prepare("UPDATE xiaomi_heartbeats SET last_heartbeat_date=?, interval_end_date=?, is_last_state=0 , updatedAt = strftime('%s','now') WHERE id=? ");
//db.close();

//interprete les log en fonctions du type
function printLog(json){
  var model = json['model'];
  var data = JSON.parse(json['data']);
  if (model === 'sensor_ht') {
    var temperature = data['temperature'] ? data['temperature'] / 100.0 : 100;
    var humidity = data['humidity'] ? data['humidity'] / 100.0 : 0;
    console.log("Step 7. Got temperature/humidity sensor:%s's heartbeat: temperature %d, humidity %d", json['sid'], temperature, humidity);
  } else if (model === 'motion') {
    console.log("Step 7. Got motion sensor:%s's heartbeat: move %s", json['sid'], (data['status'] === 'motion') ? 'detected' : 'not detected');
  } else if (model === 'magnet') {
    console.log("Step 7. Got contact/magnet sensor:%s's heartbeat: contact %s", json['sid'], (data['status'] === 'close') ? 'detected' : 'not detected');
  } else if (model === 'ctrl_neutral1') {
    console.log("Step 7. Got light switch:%s's heartbeat: %s", json['sid'], data['channel_0']);
  } else if (model === 'ctrl_neutral2') {
    console.log("Step 7. Got duplex light switch:%s's heartbeat: left %s, right %s", json['sid'], data['channel_0'], data['channel_1']);
  } else if (model === 'gateway') {
    console.log("Step 7. Got gateway:%s's heartbeat:%s with token:%s", json['sid'], json['data'], json['token']);
  } else {
    console.log("Step 7. Got %s:%s's heartbeat:%s", json['model'], json['sid'], json['data']);
  }
}

function sendWhois() {
  var cmd = '{"cmd": "whois"}';
  serverSocket.send(cmd, 0, cmd.length, multicastPort, multicastAddress);
  console.log('Step 2. Send %s to a multicast address %s:%d.', cmd, multicastAddress, multicastPort);
}

function popInterestingEvent(json){
  //TODO

  //ici il faudra faire les actions !!! verification de scenario etc...

  event_log_insert.run(Date.now(),json['sid'], json['model'], json['cmd'], json['data']);
}

function updateState(json,type=""){
  //ici on retire certain event, nottament les button (on ne veut pas suivre les periodes de non-appuie..)
  if(json['model'] === "switch" && json['data'] !== "{}"){
    popInterestingEvent(json);
    return true;
  }

  //recupere le dernier heartbeat de ce device
  db.all(" SELECT * from xiaomi_heartbeats WHERE sid = '"+json['sid']+"' AND is_last_state = 1 ", function(err, rows) {
      var now = Date.now();//on fixe la microseconde
      if(err){
        console.error(err);
        return true;
      }
      //si aucune ligne
      if(rows.length <= 0){
        //on crée un nouvel interval
        interval_begin.run(json['sid'],json['model'],json['data'],now,now,type);
      }
      //si on a deja une ligne
      else{
        //on verifie si data sont les memes
        var row = rows[0];
        if(row.data === json['data']){
          //si oui on update la date de last_heartbeat_date
          interval_update_hb.run(now,row.id);
        }
        //si non
        else{

          //filtre sur les devices qui bougent trop souvent
          let miniDelay = 60*5;
          if(json['model']==="sensor_ht" && (row.interval_begin_date + miniDelay) < now ){
            return true;
          }

          //on pop un event (le changement d'etat) sauf pour les sensor de temperature
          if(json['model']!=="sensor_ht"){
            popInterestingEvent(json);
          }

          //on ferme l'interval
          interval_end.run(now,now,row.id);
          //puis on crée un nouveau avec les new data
          interval_begin.run(json['sid'],json['model'],json['data'],now,now,type);

        }
      }
  });
}

//exemple de messega recu:
//{"cmd":"heartbeat","model":"gateway","sid":"f0b4299a63d9","short_id":"0","token":"1hX9gW20eIkqZRlY","data":"{\"ip\":\"192.168.0.12\"}"}
serverSocket.on('message', function(msg, rinfo){
  console.log('recv %s(%d bytes) from client %s:%d\n', msg, msg.length, rinfo.address, rinfo.port);
  var json;
  try {
      json = JSON.parse(msg);
  } catch (e) {
    console.log('Unexpected message: %s', msg);
    return;
  }

  var cmd = json['cmd'];
  //reception de la reponse a "whois", chaque hub renvoi cela
  if (cmd === 'iam') {
    var address = json['ip'];
    var port = json['port'];
    //on lui demande la liste de ses devices
    var cmd = '{"cmd":"get_id_list"}';
    device_insert.run(json['sid'],"Unknown Gateway","gateway");
    console.log('Step 3. Send %s to %s:%d', cmd, address, port);
    serverSocket.send(cmd, 0, cmd.length, port, address);
  }
  //reception de la liste des devices d'un hub
  else if (cmd === 'get_id_list_ack') {
    var data = JSON.parse(json['data']);
    for(var index in data) {
      var sid = data[index];
      //on insere les nouvelles devices
      device_insert.run(sid,"Unknown device");

      //on demande a chaque device son etat
      var response = '{"cmd":"read", "sid":"' + sid + '"}';
      // on stoque les infos de la gateway sur lequel contacté ce device sid
      sidToAddress[sid] = rinfo.address;
      sidToPort[sid] = rinfo.port;

      console.log('Step 4. Send %s to %s:%d', response, rinfo.address, rinfo.port);
      serverSocket.send(response, 0, response.length, rinfo.port, rinfo.address);
    }
  }
  //on recoi l'etat d'une device par demande du logger, un push, ou un ping
  else if (cmd === 'read_ack' || cmd === 'report' || cmd === 'heartbeat') {
    if (cmd === 'read_ack') {
      //on update ici le model des devices car on a demandé un etat des lieux
      device_update_model.run(json['model'],json['sid']);
    }

    //pour les capteurs multiple on enregistre separement les etats
    if(json['model']=="sensor_ht"){
      let copy = JSON.parse(JSON.stringify(json));//deep clone
      let datadec = JSON.parse(json['data']);
      if(typeof datadec['temperature'] !== "undefined"){
        copy['data'] = datadec['temperature'];
        updateState(copy,'temperature');
      }
      if(typeof datadec['humidity'] !== "undefined"){
        copy['data'] = datadec['humidity'];
        updateState(copy,'humidity');
      }
    }
    //sinon on enregistre tout
    else{
      updateState(json,'');//necessaire pour le motion (entre autre), mais a eviter pour le button
    }
    printLog(json);
  }
  //ici on se sert du logger pour passer des command a la gateway correspondant au bon sid
  else if (cmd === 'write') {
    // Commands from udpclient.js, pass them to gateway
    var sid = json['sid'];
    if (!sid || !sidToPort[sid] || !sidToAddress[sid]) {
      console.log('Invalid or unknown sid in %s', msg);
    } else {
      serverSocket.send(msg, 0, msg.length, sidToPort[sid], sidToAddress[sid]);
    }
  } else {
    console.log('recv %s(%d bytes) from client %s:%d\n', msg, msg.length, rinfo.address, rinfo.port);
    //on l'insere quand meme dans la base des event log...
    popInterestingEvent(json);
  }
});

//    err - Error object, https://nodejs.org/api/errors.html
serverSocket.on('error', function(err){
  console.log('error, msg - %s, stack - %s\n', err.message, err.stack);
});

serverSocket.on('listening', function(){
  console.log('Step 1. Start a UDP server, listening on port %d.', serverPort);
  serverSocket.addMembership(multicastAddress);
})

console.log('Demo server, in the following steps:');

serverSocket.bind(serverPort);



//on demande quel hub sont connecté
sendWhois();

//on relance un whois toute les 30sec (necessaire pour la detection de fin d'un mouvement)
setInterval(function() {
  console.log('Step 2. Start another round.');
  sendWhois();
}, 30000);
