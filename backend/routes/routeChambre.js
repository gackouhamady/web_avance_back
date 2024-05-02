const express = require('express');
const router = express.Router();
const chambreController = require('../controllers/chambreController');

// Créer une chambre
router.post('/', chambreController.createChambre);

// Récupérer toutes les chambres
router.get('/', chambreController.getChambres);

// Récupérer une chambre par son numéro
router.get('/:NumChambre', chambreController.getChambreByNumChambre);

// Mettre à jour une chambre
router.put('/:NumChambre', chambreController.updateChambre);

// Supprimer une chambre
router.delete('/:NumChambre', chambreController.deleteChambre);

module.exports = router;
