const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library API',
        description: 'A simple API for managing a library system'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js', './routes/books.js', './routes/users.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);