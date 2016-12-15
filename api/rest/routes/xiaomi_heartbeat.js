var express = require('express');
var router = express.Router();
var models = require('../models');

// Look up the heartbeat in the db and add it to this request
/*router.param('heartbeat_id', function(req, res, next, id) {
  var id = parseInt(id, 10);
  models.xiaomi_heartbeat.findById(id).then(function(foundEvent) {
    if (!foundEvent) {
      var err = new Error('Event not found');
      err.status = 404;
      return next(err);
    }
    req.heartbeat = foundEvent;
    next();
  }).error(next);
});

// Look up the heartbeat item in the db and add it to this request
router.param('item_id', function(req, res, next, id) {
  var id = parseInt(id, 10);
  req.heartbeat.getXiaomiHeartbeatItems({ id: id }).then(function(foundItems) {
    var foundItem = foundItems[0];
    if (!foundItem) {
      var err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }
    req.item = foundItem;
    next();
  }).error(next);
});*/

// Get list of heartbeats
// Optionally specify the GET param include_items to also return the items
// of this heartbeat.
router.get('/', function(req, res, next) {
  var opts = {
    offset: 0,
    limit: 50
  };

  /*if (!!req.query.include_items) {
    opts['include'] = [ models.xiaomi_heartbeatItem ];
  }*/

  models.xiaomi_heartbeat.findAll(opts).then(function(heartbeats) {
    res.json(heartbeats.map(function(heartbeat) {
      return heartbeat.toJSON();
    }));
  }).error(next);
});

// Get one heartbeat
router.get('/:heartbeat_id', function(req, res, next) {
  res.json(req.heartbeat.toJSON());
});

// Create a new heartbeat
router.post('/', function(req, res, next) {
  models.xiaomi_heartbeat.create(req.body).then(function(newEvent) {
    res.json(newEvent.toJSON());
  }).error(next);
});

// Update a heartbeat
router.put('/:heartbeat_id', function(req, res, next) {
  req.heartbeat.update(req.body).then(function(updatedEvent) {
    res.json(updatedEvent.toJSON());
  }).error(next);
});

// Delete a heartbeat
router.delete('/:heartbeat_id', function(req, res, next) {
  req.heartbeat.destroy().then(function() {
    res.status(200).end();
  }).error(next);
});
/*
// List xiaomi heartbeat items
router.get('/:heartbeat_id/items', function(req, res, next) {
  req.heartbeat.getXiaomiHeartbeatItems().then(function(items) {
    res.json(items.map(function(i) { return i.toJSON(); }));
  }).error(next);
});

// Get one heartbeat item
router.get('/:heartbeat_id/items/:item_id', function(req, res, next) {
  res.json(req.item.toJSON());
});

// Create new xiaomi heartbeat item
router.post('/:heartbeat_id/items', function(req, res, next) {
  req.heartbeat.createXiaomiHeartbeatItem({ description: req.body.description }).then(function(newItem) {
    res.json(newItem.toJSON());
  }).error(next);
});

// Delete xiaomi heartbeat item
router.delete('/:heartbeat_id/items/:item_id', function(req, res, next) {
  req.item.destroy().then(function() {
    res.status(200).end();
  }).error(next);
});

router.put('/:heartbeat_id/items/:item_id', function(req, res, next) {
  var description = req.body.description;
  req.item.update({description: description}).then(function(updatedItem) {
    res.json(updatedItem.toJSON());
  }).error(next);
});
*/
module.exports = router;
