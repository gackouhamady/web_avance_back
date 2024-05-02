const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    IdReservation: { type: Number, required: true, unique: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    chambre: { type: Schema.Types.ObjectId, ref: 'Chambre', required: true },
    DateDebutOccup: { type: Date, required: true },
    DateFinOccup: { type: Date, required: true }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
