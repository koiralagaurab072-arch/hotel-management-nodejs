
const mongoose = require('mongoose');

const personschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:60
    },
    address:{
        type:String,
        required:true
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    email:{
   type:String,
   required:true,
   unique:true
    }

})

//create perosn model
const person=mongoose.model('person',personschema);
module.exports=person;