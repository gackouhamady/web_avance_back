const Reservation = require('../models/reservationsModel');

const createReservation = async (req, res) => {
  try {
    const { IdReservation, client, chambre, DateDebutOccup, DateFinOccup } = req.body;

    if (!IdReservation || !client || !chambre || !DateDebutOccup || !DateFinOccup) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const reservation = new Reservation({ IdReservation, client, chambre, DateDebutOccup, DateFinOccup });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('client chambre');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { IdReservation } = req.params;

    const existingReservation = await Reservation.findOne({ IdReservation });

    if (!existingReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    await Reservation.findOneAndUpdate({ IdReservation }, req.body);

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { IdReservation } = req.params;

    const existingReservation = await Reservation.findOne({ IdReservation });

    if (!existingReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    await Reservation.findOneAndDelete({ IdReservation });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const { IdReservation } = req.params;

    const reservation = await Reservation.findOne({ IdReservation }).populate('client chambre');

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
  getReservationById,
};
