const Product = require('../models/product');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if(products.length == 0){
            return res.json({message: 'There are no products'});
        }
        res.json(products);

    } catch (error) {
        console.error('Error fetching products', error);
        res.status(404).json({message: 'Bad Request'});
    }
}

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
        res.status(404).json({message: 'Bad Request'});
    }

}

exports.editProduct = async (req, res) => {
    const productId = req.params.productid;

    const {name, image, description, price, category, brand, stockQuantity} = req.body;

    try {
        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }

        if(name){
            product.name = name;
        }

        if(image){
            const imageUloadResult = await cloudinary.uploader.upload(image);
            const imageUrl = imageUloadResult.secure_url; 
            product.image = imageUrl;
        }

        if(description){
            product.description = description;
        }

        if(price){
            product.price = price;
        }

        if(category){
            product.category = category;
        }

        if(brand){
            product.brand = brand;
        }

        if(stockQuantity){
            product.stockQuantity = stockQuantity;
        }

        await product.save();

        res.status(200).json({message: 'Product updated successfully', product});

    } catch (error) {
        console.error('Error updating the product', error);
        res.status(404).json({message: "Bad request"});
    }
}

exports.deleteProduct = async (req, res) => {
    const productId = req.params.productid;

    try {
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        await product.deleteOne();

        res.status(200).json({message: 'Product deleted successfully'});

    } catch (error) {
        console.error("Error deleting product", error);
        res.status(404).json({message: 'Bad Request'})
    }

}