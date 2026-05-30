const mongoose = require('mongoose');
//const mongourl = 'mongodb://localhost:27017/hotel';
//const mongourl= 'mongodb+srv://koiralagaurav2_db_user:bhoot4321@cluster1.teudxu7.mongodb.net/'
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