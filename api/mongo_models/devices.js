module.exports = function(mongoose){
  schema = new mongoose.Schema({
    sid: String,
    name: String,
    model: String
  });

  model = mongoose.model('devices', schema);

  return model;
}
