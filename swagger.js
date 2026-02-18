const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Final Project Car Rental',
    description: 'Car Rental project for CSE-341 - Web Services'
  },
  host: 'localhost:3000',
  schemes: ['http','https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);