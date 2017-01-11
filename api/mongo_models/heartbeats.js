module.exports = function(mongoose,genApi,app,router){
  schema = new mongoose.Schema({
    sid: String,
    model: String,
    is_last_state:Boolean,
    data: String,
    interval_begin_date: { type: Date, default: Date.now },
    interval_end_date: Date,
    last_heartbeat_date: { type: Date, default: Date.now }
  });

  model = mongoose.model('heartbeats', schema);

  genApi(app,router,model,"/api");
}
