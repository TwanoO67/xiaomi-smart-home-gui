var express = require('express');
var router = express.Router();
var models = require('../models');

// Look up the device in the db and add it to this request
/*router.param('device_id', function(req, res, next, id) {
  var id = parseInt(id, 10);
  models.xiaomi_device.findById(id).then(function(foundEvent) {
    if (!foundEvent) {
      var err = new Error('Event not found');
      err.status = 404;
      return next(err);
    }
    req.device = foundEvent;
    next();
  }).error(next);
});

// Look up the device item in the db and add it to this request
router.param('item_id', function(req, res, next, id) {
  var id = parseInt(id, 10);
  req.device.getXiaomiEventItems({ id: id }).then(function(foundItems) {
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

// Get list of devices
// Optionally specify the GET param include_items to also return the items
// of this device.
router.get('/', function(req, res, next) {
  var opts = {};

  /*if (!!req.query.include_items) {
    opts['include'] = [ models.xiaomi_deviceItem ];
  }*/

  models.xiaomi_device.findAll(opts).then(function(devices) {
    res.json(devices.map(function(device) {
      return device.toJSON();
    }));
  }).error(next);
});

// Get one device
router.get('/:device_id', function(req, res, next) {
  res.json(req.device.toJSON());
});

// Create a new device
router.post('/', function(req, res, next) {
  models.xiaomi_device.create(req.body).then(function(newEvent) {
    res.json(newEvent.toJSON());
  }).error(next);
});

// Update a device
router.put('/:device_id', function(req, res, next) {
  req.device.update(req.body).then(function(updatedEvent) {
    res.json(updatedEvent.toJSON());
  }).error(next);
});

// Delete a device
router.delete('/:device_id', function(req, res, next) {
  req.device.destroy().then(function() {
    res.status(200).end();
  }).error(next);
});
/*
// List xiaomi device items
router.get('/:device_id/items', function(req, res, next) {
  req.device.getXiaomiEventItems().then(function(items) {
    res.json(items.map(function(i) { return i.toJSON(); }));
  }).error(next);
});

// Get one device item
router.get('/:device_id/items/:item_id', function(req, res, next) {
  res.json(req.item.toJSON());
});

// Create new xiaomi device item
router.post('/:device_id/items', function(req, res, next) {
  req.device.createXiaomiEventItem({ description: req.body.description }).then(function(newItem) {
    res.json(newItem.toJSON());
  }).error(next);
});

// Delete xiaomi device item
router.delete('/:device_id/items/:item_id', function(req, res, next) {
  req.item.destroy().then(function() {
    res.status(200).end();
  }).error(next);
});

router.put('/:device_id/items/:item_id', function(req, res, next) {
  var description = req.body.description;
  req.item.update({description: description}).then(function(updatedItem) {
    res.json(updatedItem.toJSON());
  }).error(next);
});
*/
module.exports = router;
