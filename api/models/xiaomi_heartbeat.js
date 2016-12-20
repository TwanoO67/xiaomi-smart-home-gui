module.exports = function(sequelize, DataTypes) {
  var XiaomiHeartbeat = sequelize.define("xiaomi_heartbeat", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sid: DataTypes.TEXT,
    model: DataTypes.TEXT,
    is_last_state: DataTypes.INTEGER,
    data: DataTypes.TEXT,
    interval_begin_date: DataTypes.INTEGER,
    interval_end_date: DataTypes.INTEGER,
    last_heartbeat_date: DataTypes.INTEGER
  });

  return XiaomiHeartbeat;
}
