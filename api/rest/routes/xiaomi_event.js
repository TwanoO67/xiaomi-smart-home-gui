var express = require('express');
var router = express.Router();
var models = require('../models');

// Look up the event in the db and add it to this request
/*router.param('event_id', function(req, res, next, id) {
  var id = parseInt(id, 10);
  models.xiaomi_event.findById(id).then(function(foundEvent) {
    if (!foundEvent) {
      var err = new Error('Event not found');
      err.status = 404;
      return next(err);
    }
    req.event = foundEvent;
    next();
  }).error(next);
});

// Look up the event item in the db and add it to this request
router.param('item_id', function(req, res, next, id) {
  var id = parseInt(id, 10);
  req.event.getXiaomiEventItems({ id: id }).then(function(foundItems) {
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

// Get list of events
// Optionally specify the GET param include_items to also return the items
// of this event.
router.get('/', function(req, res, next) {
  var opts = {
    offset: 0,
    limit: 50
  };

  /*if (!!req.query.include_items) {
    opts['include'] = [ models.xiaomi_eventItem ];
  }*/

  models.xiaomi_event.findAll(opts).then(function(events) {
    res.json(events.map(function(event) {
      return event.toJSON();
    }));
  }).error(next);
});

// Get one event
router.get('/:event_id', function(req, res, next) {
  res.json(req.event.toJSON());
});

// Create a new event
router.post('/', function(req, res, next) {
  models.xiaomi_event.create(req.body).then(function(newEvent) {
    res.json(newEvent.toJSON());
  }).error(next);
});

// Update a event
router.put('/:event_id', function(req, res, next) {
  req.event.update(req.body).then(function(updatedEvent) {
    res.json(updatedEvent.toJSON());
  }).error(next);
});

// Delete a event
router.delete('/:event_id', function(req, res, next) {
  req.event.destroy().then(function() {
    res.status(200).end();
  }).error(next);
});
/*
// List xiaomi event items
router.get('/:event_id/items', function(req, res, next) {
  req.event.getXiaomiEventItems().then(function(items) {
    res.json(items.map(function(i) { return i.toJSON(); }));
  }).error(next);
});

// Get one event item
router.get('/:event_id/items/:item_id', function(req, res, next) {
  res.json(req.item.toJSON());
});

// Create new xiaomi event item
router.post('/:event_id/items', function(req, res, next) {
  req.event.createXiaomiEventItem({ description: req.body.description }).then(function(newItem) {
    res.json(newItem.toJSON());
  }).error(next);
});

// Delete xiaomi event item
router.delete('/:event_id/items/:item_id', function(req, res, next) {
  req.item.destroy().then(function() {
    res.status(200).end();
  }).error(next);
});

router.put('/:event_id/items/:item_id', function(req, res, next) {
  var description = req.body.description;
  req.item.update({description: description}).then(function(updatedItem) {
    res.json(updatedItem.toJSON());
  }).error(next);
});
*/
module.exports = router;
