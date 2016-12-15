module.exports = function(sequelize, DataTypes) {
  var ShoppingCart = sequelize.define("ShoppingCart", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        ShoppingCart.hasMany(models.ShoppingCartItem);
      }
    }
  });

  return ShoppingCart;
}
