const express = require('express');
const router = express.Router();
const {createProduct} = require('../../controller/product');


router.post("/create", createProduct);


module.exports = router;

