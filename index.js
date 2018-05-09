/*eslint-disable no-console*/
const app = require('./server').app;
const PORT = process.env.PORT;


app.listen(PORT, function () {
  console.log(`listening on port ${process.env.PORT}`);
});

