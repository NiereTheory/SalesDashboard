const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./routes/index.routes');
const config = require('./config');

const app = express();

// Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(morgan(config.env));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Content-Type", "application/json");
  next();
});

app.use('/api', routes);

app.listen(config.port, () => console.log('Example app listening on port 3000!'))
// module.exports = app;