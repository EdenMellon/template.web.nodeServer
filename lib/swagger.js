'use strict';
const swaggerJSDoc = require('swagger-jsdoc');
// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
let swaggerDefinition = {
  info: { // API informations (required)
    title: 'node api', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  basePath: '/', // Base path (optional)
};
// Options for the swagger docs
let options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  apis: [
    './controllers/*',
  ],
};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
let swaggerSpec = swaggerJSDoc(options)

const swaggerUi = require('swagger-ui-express');

exports.load = function(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};