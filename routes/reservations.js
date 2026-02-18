const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservations');
const { reservationValidationRules, validate } = require('./validator');


router.get('/', controller.getAll);

router.get('/:id', controller.getReservationById);

router.post('/', reservationValidationRules(), validate, controller.createReservation);

router.put('/:id', reservationValidationRules(),validate ,controller.updateReservation);

router.delete('/:id', controller.deleteReservation);

module.exports = router;