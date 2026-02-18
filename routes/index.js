const express = require('express');
const router = express.Router();
const cars = require('./cars');
const categories = require('./carCategories');
const locations = require('./locations');
const reservations = require('./reservations');
const swagger = require('./swagger');

router.use('/', swagger);

router.get('/', (req, res) => {
    res.send('Main page');
});

router.use('/cars', cars);

router.use('/carCategories', categories);

router.use('/locations', locations);

router.use('/reservations', reservations);

module.exports = router;