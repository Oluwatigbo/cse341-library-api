    require('dotenv').config();
     const express = require('express');
     const mongoose = require('mongoose');
     const swaggerJsdoc = require('swagger-jsdoc');
     const swaggerUi = require('swagger-ui-express');
     const cors = require('cors');  
     const app = express();
     const port = process.env.PORT || 3000;

     mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB'))
       .catch(err => console.error('Connection error:', err));

     app.use(cors());  
     app.use(express.json());

     const swaggerOptions = {
       definition: {
         openapi: '3.0.0',
         info: { title: 'Library API', version: '1.0.0', description: 'API for library management' },
         servers: [
           { url: 'http://localhost:3000' }, 
           { url: 'https://cse341-library-api-9jqk.onrender.com' } 
         ],
       },
       apis: ['./routes/books.js'],
     };
     const swaggerSpec = swaggerJsdoc(swaggerOptions);
     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

     app.use('/books', require('./routes/books'));

     app.get('/', (req, res) => res.send('Library API'));

     app.listen(port, () => console.log(`Server on port ${port}`));