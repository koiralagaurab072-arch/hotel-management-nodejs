const mongoose = require('mongoose');

const menuschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true,
    },
    price: {
        type: Number,
        max: 2000,
        required: true,
    },
    taste: {
        type: String,
        enum: ['spicy', 'sweet', 'hot'],
        required: true,
    },
    createdAt:{
        type:Date,
        defult:Date.now
    }

},{timestamps: true})

const menu = mongoose.model('menu', menuschema);
module.exports = menu;

