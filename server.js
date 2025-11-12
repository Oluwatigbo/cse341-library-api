const express = require('express');
const bodyParser = require('body-parser');  // Ensure this is required
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());  // This parses JSON; ensure it's here
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes'));

app.get('/', (req, res) => res.send('Library API Running'));

mongodb.initDb((err) => {
    if (err) {
        console.log('DB init error:', err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected and server running on port ${port}`);
        });
    }
});