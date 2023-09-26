const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const app = express();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./swagger-config.json");

app.use(cors());
require('dotenv').config();

const PORT = 4000;
app.use(express.json());
connectDB();

const specs = swaggerJsdoc({
    swaggerDefinition: swaggerConfig,
    apis: ["./routes/*.js"]
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get("/", (req, res) => {
    res.send("API running");
})

app.use('/api/products', require('./routes/api/products'));


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(PORT, () => {
    console.log(`Server started on port, ${PORT}`);
})