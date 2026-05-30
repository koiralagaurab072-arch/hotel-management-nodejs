const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const dns=require('dns');
require('dotenv').config();

const PORT=process.env.PORT ||3000;

dns.setServers(["1.1.1.1","8.8.8.8"]);

app.use(bodyParser.json());

const personroutes = require('./routes/personroutes');
app.use('/', personroutes);

const menuroute = require('./routes/menuroute');
app.use('/', menuroute);

const inventoryroute = require('./routes/inventoryroute');
app.use('/', inventoryroute);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});