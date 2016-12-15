var express = require('express');
var router = express.Router();
var models = require('../models');

// Look up the cart in the db and add it to this request
router.param('cart_id', function(req, res, next, id) {
  var id = parseInt(id, 10);
  models.ShoppingCart.findById(id).then(function(foundCart) {
    if (!foundCart) {
      var err = new Error('Cart not found');
      err.status = 404;
      return next(err);
    }
    req.cart = foundCart;
    next();
  }).error(next);
});

// Look up the cart item in the db and add it to this request
router.param('item_id', function(req, res, next, id) {
  var id = parseInt(id, 10);
  req.cart.getShoppingCartItems({ id: id }).then(function(foundItems) {
    var foundItem = foundItems[0];
    if (!foundItem) {
      var err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }
    req.item = foundItem;
    next();
  }).error(next);
});

// Get list of carts
// Optionally specify the GET param include_items to also return the items
// of this cart.
router.get('/', function(req, res, next) {
  var opts = {};

  if (!!req.query.include_items) {
    opts['include'] = [ models.ShoppingCartItem ];
  }

  models.ShoppingCart.findAll(opts).then(function(carts) {
    res.json(carts.map(function(cart) {
      return cart.toJSON();
    }));
  }).error(next);
});

// Get one cart
router.get('/:cart_id', function(req, res, next) {
  res.json(req.cart.toJSON());
});

// Create a new cart
router.post('/', function(req, res, next) {
  models.ShoppingCart.create(req.body).then(function(newCart) {
    res.json(newCart.toJSON());
  }).error(next);
});

// Update a cart
router.put('/:cart_id', function(req, res, next) {
  var name = req.body.name;

  req.cart.update({name: name}).then(function(updatedCart) {
    res.json(updatedCart.toJSON());
  }).error(next);
});

// Delete a cart
router.delete('/:cart_id', function(req, res, next) {
  req.cart.destroy().then(function() {
    res.status(200).end();
  }).error(next);
});

// List shopping cart items
router.get('/:cart_id/items', function(req, res, next) {
  req.cart.getShoppingCartItems().then(function(items) {
    res.json(items.map(function(i) { return i.toJSON(); }));
  }).error(next);
});

// Get one cart item
router.get('/:cart_id/items/:item_id', function(req, res, next) {
  res.json(req.item.toJSON());
});

// Create new shopping cart item
router.post('/:cart_id/items', function(req, res, next) {
  req.cart.createShoppingCartItem({ description: req.body.description }).then(function(newItem) {
    res.json(newItem.toJSON());
  }).error(next);
});

// Delete shopping cart item
router.delete('/:cart_id/items/:item_id', function(req, res, next) {
  req.item.destroy().then(function() {
    res.status(200).end();
  }).error(next);
});

router.put('/:cart_id/items/:item_id', function(req, res, next) {
  var description = req.body.description;
  req.item.update({description: description}).then(function(updatedItem) {
    res.json(updatedItem.toJSON());
  }).error(next);
});

module.exports = router;
