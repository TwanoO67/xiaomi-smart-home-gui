module.exports = function(mongoose){
  schema = new mongoose.Schema({
    sid: String,
    model: String,
    data_type: String,
    is_last_state:Boolean,
    data: String,
    interval_begin_date: { type: Date, default: Date.now },
    interval_end_date: Date,
  },{
    timestamps: true
  });

  model = mongoose.model('heartbeats', schema);

  return model;
}
