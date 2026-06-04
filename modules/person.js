
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const personschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 60
    },
    address: {
        type: String,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})


//bycrypt pass 
personschema.pre('save', async function() {
    if (!this.isModified('password')) return;

    const hashpass=this.password+process.env.PEPPER_STR;

    this.password = await bcrypt.hash(hashpass, 10);
    // no next() needed — mongoose handles it automatically
});

personschema.methods.comparePassword=async function(candidatePassword){
    try{
            const hashpass=candidatePassword+process.env.PEPPER_STR;
        const isMatch=await bcrypt.compare(hashpass,this.password);
        return isMatch;
    }catch(err){
    throw err;}
}

//create perosn model
const person = mongoose.model('person', personschema);
module.exports = person;