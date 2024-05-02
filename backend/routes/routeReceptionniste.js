const express = require('express');
const router = express.Router();
const receptionnisteController = require('../controllers/receptionnisteController');

// Créer un réceptionniste
router.post('/', receptionnisteController.createReceptionniste);

// Obtenir tous les réceptionnistes
router.get('/', receptionnisteController.getReceptionnistes);

// Obtenir un réceptionniste par son numéro
router.get('/:NumReceptionniste', receptionnisteController.getReceptionnisteByNumReceptionniste);

// Mettre à jour un réceptionniste
router.put('/:NumReceptionniste', receptionnisteController.updateReceptionniste);

// Supprimer un réceptionniste
router.delete('/:NumReceptionniste', receptionnisteController.deleteReceptionniste);

// Login d'un réceptionniste
router.post('/login', receptionnisteController.login);

module.exports = router;
