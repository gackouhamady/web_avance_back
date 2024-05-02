const Client = require('../models/clientsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');
 
const secretKey = process.env.SECRET_KEY;; // Définir une clé secrète valide pour votre application

const createClient = async (req, res) => {
  try {
    const { Nom, Prenom, email } = req.body;

    if (!Nom || !Prenom || !email) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si un client existe déjà avec cet email
    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.status(400).json({ message: 'Un client avec cet email existe déjà' });
    }

    // Hacher le mot de passe
    const password = generateRandomPassword(12); // Générer un mot de passe aléatoire
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new Client({  Nom, Prenom, email, hashedPassword  });
    await client.save();
    
    // Envoi du mot de passe généré par e-mail ou autre moyen sécurisé

    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

function generateRandomPassword(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // Convertir en format hexadécimal
    .slice(0, length); // Retourner la longueur souhaitée
}

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const { NumClient } = req.params;

    const existingClient = await Client.findOne({ NumClient });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    await Client.findOneAndUpdate({ NumClient }, req.body);

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { NumClient } = req.params;

    const existingClient = await Client.findOne({ NumClient });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    await Client.findOneAndDelete({ NumClient });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getClientByNumClient = async (req, res) => {
  try {
    const { NumClient } = req.params;

    const client = await Client.findOne({ NumClient });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 


module.exports = {
  createClient,
  getClients,
  updateClient,
  deleteClient,
  getClientByNumClient,
  
};
