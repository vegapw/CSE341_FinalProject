const express = require('express');
const router = express.Router();
const controller = require('../controllers/locations');
const { locationValidationRules, validate } = require('./validator');
const { ensureAuth } = require('../middleware/auth');

router.get('/', controller.getAll);

router.get('/:id', controller.getLocationById);

router.post('/', ensureAuth, locationValidationRules(), validate, controller.createLocation);

router.put('/:id', ensureAuth, locationValidationRules(),validate ,controller.updateLocation);

router.delete('/:id', ensureAuth, controller.deleteLocation);

module.exports = router;