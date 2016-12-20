module.exports = function(sequelize, DataTypes) {
  var XiaomiEvent = sequelize.define("xiaomi_event", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: DataTypes.INTEGER,
    sid: DataTypes.TEXT,
    model: DataTypes.TEXT,
    cmd: DataTypes.TEXT,
    data: DataTypes.TEXT
  });

  return XiaomiEvent;
}
