const express = require('express');
const router = express.Router();
const cars = require('./cars');
const categories = require('./carCategories');
const swagger = require('./swagger');

router.use('/', swagger);

router.get('/', (req, res) => {
    //#swagger.tags=['Main']
    res.send('Main page');
});

router.use('/cars', cars);

router.use('/carCategories', categories);

module.exports = router;