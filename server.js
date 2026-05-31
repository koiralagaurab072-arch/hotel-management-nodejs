const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const passport=require('password');
const LocalStrategy=require('passport-local').Strategy;
//const dns=require('dns');
require('dotenv').config();

const logreq=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' })}]  request made to:${req.originalUrl}`);
  next();
};

app.use(logreq);

const PORT=process.env.PORT ||3000;

//dns.setServers(["1.1.1.1","8.8.8.8"]);

app.get('/', (req,res)=>{
  res.send("Welcome to mustang ")
})

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