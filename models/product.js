const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    }

},{timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;