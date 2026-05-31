const mongoose = require('mongoose');
require('dotenv').config();
const mongourl=process.env.LOCAL_URL;

mongoose.connect(mongourl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection failed:', err));


  mongoose.connection.on('disconnected',()=>{
    console.log("disconnected sucessfully");
  });

  mongoose.connection.on('error',(err)=>{
    console.error("error occur",err);
  });
 

//export the db connection to server
module.exports=mongoose.connection;