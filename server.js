const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const personroutes = require('./routes/personroutes');
app.use('/', personroutes);

const menuroute = require('./routes/menuroute');
app.use('/', menuroute);

const inventoryroute = require('./routes/inventoryroute');
app.use('/', inventoryroute);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});