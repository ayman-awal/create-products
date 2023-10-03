const express = require('express');
const router = express.Router();
const {createProduct, getProducts, deleteProduct, editProduct} = require('../../controller/product');

router.get("/", getProducts);
router.post("/create", createProduct);
router.patch("/edit/:productid", editProduct);
router.delete("/delete/:productid", deleteProduct);


module.exports = router;

