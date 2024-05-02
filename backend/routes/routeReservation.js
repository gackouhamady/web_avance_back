const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getReservations);
router.put('/:IdReservation', reservationController.updateReservation);
router.delete('/:IdReservation', reservationController.deleteReservation);
router.get('/:IdReservation', reservationController.getReservationById);

module.exports = router;
