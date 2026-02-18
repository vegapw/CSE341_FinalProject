const express = require('express');
const router = express.Router();
const controller = require('../controllers/carCategories');
const { categoriesValidationRules, validate } = require('./validator');

router.get('/', controller.getAll);

router.get('/:id', controller.getCategoryById);

router.post('/', categoriesValidationRules(), validate, controller.createCarCategory);

router.put('/:id', categoriesValidationRules(),validate ,controller.updateCarCategory);

router.delete('/:id', controller.deleteCarCategory);

module.exports = router;