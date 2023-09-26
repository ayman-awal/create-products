const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/*.js"];

swaggerAutogen(outputFile, endpointsFile);