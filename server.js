const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const passport = require('./auth');

//const dns=require('dns');
//dns.setServers(["1.1.1.1","8.8.8.8"]);
require('dotenv').config();

const logreq = (req, res, next) => {
  console.log(`[${new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' })}]  request made to:${req.originalUrl}`);
  next();
};
app.use(bodyParser.json());
app.use(logreq);

app.use(passport.initialize());

const Auth=passport.authenticate('local',{session:false});
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Welcome to mustang ")
})



const personroutes = require('./routes/personroutes');
app.use('/', personroutes);

const menuroute = require('./routes/menuroute');
app.use('/', menuroute);

const inventoryroute = require('./routes/inventoryroute');
app.use('/', inventoryroute);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
}); 