const express = require('express');
const router = express.Router();
const controller = require('../controllers/locations');
const { locationValidationRules, validate } = require('./validator');


router.get('/', controller.getAll);

router.get('/:id', controller.getLocationById);

router.post('/', locationValidationRules(), validate, controller.createLocation);

router.put('/:id', locationValidationRules(),validate ,controller.updateLocation);

router.delete('/:id', controller.deleteLocation);

module.exports = router;