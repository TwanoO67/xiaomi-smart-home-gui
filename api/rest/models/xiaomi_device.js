module.exports = function(sequelize, DataTypes) {
  var XiaomiDevice = sequelize.define("xiaomi_device", {
    sid: {
      type: DataTypes.TEXT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.TEXT,
    model: DataTypes.TEXT
  });

  return XiaomiDevice;
}
