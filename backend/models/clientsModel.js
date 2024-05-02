const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    NumClient: { type: Number,default: null },
    Nom: { type: String, required: true },
    Prenom: { type: String, required: true },
    email :{type:String, required:true},
    password:{type:String, default:null}
},

{
    timestamps: true,
  }

);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
