module.exports = function(mongoose){
  schema = new mongoose.Schema({
    sid: String,
    model: String,
    cmd: String,
    data: mongoose.Schema.Types.Mixed
  },{
    timestamps: true
  });

  model = mongoose.model('events', schema);

  return model;
}
