const app = require('./server').app;
const PORT = require('./config').PORT[process.env.NODE_ENV];
const apirouter =  require('./routes/apiRoute').router
const mongooseConnect = require('./server').mongooseConnect
const bodyParser = require('body-parser');
const cors =require('cors');




app.use(cors())
app.use(bodyParser.json());

app.use('/api',apirouter)

app.use((err, req, res, next) => {
  if(err.status = 404) return res.status(404).send(err)
  next();
})

app.use((err, req, res, next) => {
  res.status(500).send(err);
})

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});