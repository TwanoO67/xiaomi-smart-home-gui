module.exports = function(mongoose,genApi,app,router){
  schema = new mongoose.Schema({
    sid: String,
    name: String,
    model: String
  });

  model = mongoose.model('devices', schema);

  genApi(app,router,model,"/api");
}
