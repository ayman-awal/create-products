const Product = require('../models/product');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

exports.createProduct = async (req, res) => {
    const {name, image, description, price, category, brand, stockQuantity} = req.body;

    if(!name || !image || !description || !price || !category || !brand || !stockQuantity){
        return res.status(400).json({message: 'Please provide all fields'});
    }

    try {
        const imageUloadResult = await cloudinary.uploader.upload(image);
        const imageUrl = imageUloadResult.secure_url;
        const product = Product({
            name,
            image: imageUrl,
            description,
            price,
            category,
            brand,
            stockQuantity
        });

        await product.save();

        res.status(200).json({message: 'Product created succesfully', product})
    } catch (error) {
        console.error('Error creating product', error);
        res.status(500).json({message: 'Internal Server Error'});
    }

}