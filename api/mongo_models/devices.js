module.exports = function(mongoose){
  schema = new mongoose.Schema({
    sid: String,
    name: String,
    model: String
  },{
    timestamps: true
  });

  model = mongoose.model('devices', schema);

  return model;
}
