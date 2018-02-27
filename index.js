const app = require('./server').app;
const PORT = require('./config').PORT[process.env.NODE_ENV];
const apirouter =  require('./routes/apiRoute').router
const mongooseConnect = require('./server').mongooseConnect


mongooseConnect()
app.use('/api',apirouter)



app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});