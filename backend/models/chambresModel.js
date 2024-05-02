const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chambreSchema = new Schema({
    NumChambre: { type: Number, required: true, unique: true },
    Type: { type: String, required: true },
    Caracteristique: { type: String, required: true },
    Etage: { type: Number, required: true },
    Prix: { type: Number, required: true }
   
},

{
    timestamps: true,
}


);

const Chambre = mongoose.model('Chambre', chambreSchema);

module.exports = Chambre;
