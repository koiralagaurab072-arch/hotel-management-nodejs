const mongoose = require('mongoose');
const inventoryschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 25,
      
    },
    price:{
        type:Number,
        required:true

    },
    quantity: {
        type: Number,
      
        default: 0
    },
    type: {
        type: String,
        enum: ['ketchup', 'soap', 'masala', 'medicine'],
        required: true
    },
    entrydate: {
        type: Date,
        defult:Date.now
      
    }
}  ,{timestamps: true})

const inventory = mongoose.model('inventory', inventoryschema);
module.exports = inventory;
