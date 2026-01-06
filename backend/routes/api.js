const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const playerController = require('../controllers/playerController');

// Authentication Routes
router.post('/login', authController.login);

// Player Routes
router.get('/players', playerController.getAllPlayers);
router.get('/player/:id', playerController.getPlayerById);
router.post('/propose-update/:id', playerController.updatePlayerPlan);

module.exports = router;