const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Library API'];
    res.send('Library API is running');
});


router.use('/books', require('./books'));

module.exports = router;