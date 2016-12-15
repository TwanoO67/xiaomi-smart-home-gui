module.exports = function(sequelize, DataTypes) {
  var ShoppingCartItem = sequelize.define('ShoppingCartItem', {
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        ShoppingCartItem.belongsTo(models.ShoppingCart, {
          onDelete: 'CASCADE',
          foreignKey: { notNull: true }
        });
      }
    }
  });

  return ShoppingCartItem;
}
