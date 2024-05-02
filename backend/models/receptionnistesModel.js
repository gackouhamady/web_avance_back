const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receptionnisteSchema = new Schema({
    NumReceptionniste:{type:Number, requred:true},
    Nom: { type: String, required: true },
    Prenom: { type: String, required: true },
    email:  {type:String,required:true},
    password:{type:String, required:true}
}, { timestamps: true });

const Receptionniste = mongoose.model('Receptionniste', receptionnisteSchema);

module.exports = Receptionniste;
