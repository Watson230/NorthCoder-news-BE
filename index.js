/*eslint-disable no-console*/
const app = require('./server').app;


app.listen(process.env.PORT, function () {
  console.log(`listening on port ${process.env.PORT}`);
});

