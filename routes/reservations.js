const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservations');
const { reservationValidationRules, validate } = require('./validator');
const { ensureAuth } = require('../middleware/auth');

router.get('/', controller.getAll);

router.get('/:id', controller.getReservationById);

router.post('/', ensureAuth, reservationValidationRules(), validate, controller.createReservation);

router.put('/:id', ensureAuth, reservationValidationRules(),validate ,controller.updateReservation);

router.delete('/:id', ensureAuth, controller.deleteReservation);

module.exports = router;