const Receptionniste = require('../models/receptionnistesModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY; // Définir une clé secrète valide pour votre application

const createReceptionniste = async (req, res) => {
  try {
    const { NumReceptionniste, Nom, Prenom, email, password } = req.body;

    if (!NumReceptionniste || !Nom || !Prenom || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si un réceptionniste existe déjà avec cet email
    const existingReceptionniste = await Receptionniste.findOne({ email });

    if (existingReceptionniste) {
      return res.status(400).json({ message: 'Un réceptionniste avec cet email existe déjà' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const receptionniste = new Receptionniste({ NumReceptionniste, Nom, Prenom, email, password: hashedPassword });
    await receptionniste.save();
    res.status(201).json(receptionniste);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReceptionnistes = async (req, res) => {
  try {
    const receptionnistes = await Receptionniste.find();
    res.json(receptionnistes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReceptionniste = async (req, res) => {
  try {
    const { NumReceptionniste } = req.params;

    const existingReceptionniste = await Receptionniste.findOne({ NumReceptionniste });

    if (!existingReceptionniste) {
      return res.status(404).json({ message: 'Réceptionniste non trouvé' });
    }

    await Receptionniste.findOneAndUpdate({ NumReceptionniste }, req.body);

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReceptionniste = async (req, res) => {
  try {
    const { NumReceptionniste } = req.params;

    const existingReceptionniste = await Receptionniste.findOne({ NumReceptionniste });

    if (!existingReceptionniste) {
      return res.status(404).json({ message: 'Réceptionniste non trouvé' });
    }

    await Receptionniste.findOneAndDelete({ NumReceptionniste });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReceptionnisteByNumReceptionniste = async (req, res) => {
  try {
    const { NumReceptionniste } = req.params;

    const receptionniste = await Receptionniste.findOne({ NumReceptionniste });

    if (!receptionniste) {
      return res.status(404).json({ message: 'Réceptionniste non trouvé' });
    }

    res.json(receptionniste);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const receptionniste = await Receptionniste.findOne({ email });

    if (!receptionniste) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const isPasswordValid = await bcrypt.compare(password, receptionniste.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const token = jwt.sign({ userId: receptionniste._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReceptionniste,
  getReceptionnistes,
  updateReceptionniste,
  deleteReceptionniste,
  getReceptionnisteByNumReceptionniste,
  login,
};
