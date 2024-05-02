const chambreModel = require('../models/chambresModel');

const createChambre = async (req, res) => {
  try {
    const { NumChambre, Type, Caracteristique, Etage, Prix } = req.body;

    if (!NumChambre || !Type || !Caracteristique || !Etage || !Prix) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const existingChambre = await chambreModel.findOne({ NumChambre });

    if (existingChambre) {
      return res.status(400).json({ message: 'Ce numéro de chambre est déjà utilisé' });
    }

    const chambre = new chambreModel({ NumChambre, Type, Caracteristique, Etage, Prix });
    await chambre.save();
    res.status(201).json(chambre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChambres = async (req, res) => {
  try {
    const chambres = await chambreModel.find();
    res.json(chambres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateChambre = async (req, res) => {
  try {
    const { NumChambre } = req.params;

    const existingChambre = await chambreModel.findOne({ NumChambre });

    if (!existingChambre) {
      return res.status(404).json({ message: 'Chambre non trouvée' });
    }

    await chambreModel.findOneAndUpdate({ NumChambre }, req.body);

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteChambre = async (req, res) => {
  try {
    const { NumChambre } = req.params;

    const existingChambre = await chambreModel.findOne({ NumChambre });

    if (!existingChambre) {
      return res.status(404).json({ message: 'Chambre non trouvée' });
    }

    await chambreModel.findOneAndDelete({ NumChambre });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChambreByNumChambre = async (req, res) => {
  try {
    const { NumChambre } = req.params;

    const chambre = await chambreModel.findOne({ NumChambre });

    if (!chambre) {
      return res.status(404).json({ message: 'Chambre non trouvée' });
    }

    res.json(chambre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChambre,
  getChambres,
  updateChambre,
  deleteChambre,
  getChambreByNumChambre,
};
