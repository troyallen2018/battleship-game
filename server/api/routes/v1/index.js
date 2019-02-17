const express = require('express');
const gameRoutes = require('./game.route');
const router = express.Router();

/**
 * API status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * API docs
 */
router.use('/docs', express.static('docs'));

/**
 * Game
 */
router.use('/game', gameRoutes);

module.exports = router;
