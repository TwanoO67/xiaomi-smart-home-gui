module.exports = function(mongoose,genApi,app,router){
  schema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    sid: String,
    data_type: String,
    model: String,
    cmd: String,
    data: String
  });

  model = mongoose.model('events', schema);

  genApi(app,router,model,"/api");
}
