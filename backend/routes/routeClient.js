const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


// Créer un client
router.post('/', clientController.createClient);

// Récupérer tous les clients
router.get('/', clientController.getClients);

// Mettre à jour un client
router.put('/:NumClient', clientController.updateClient);

// Supprimer un client
router.delete('/:NumClient', clientController.deleteClient);

// Récupérer un client par son numéro de client
router.get('/:NumClient', clientController.getClientByNumClient);


module.exports = router;
