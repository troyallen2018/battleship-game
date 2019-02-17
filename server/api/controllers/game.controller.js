const httpStatus = require('http-status');
const Game = require('../models/game.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Start Game
 * @public
 */
exports.start = (req, res) => {
  const {rowsCount, colsCount, shipsCounts} = req.body;

  Game.initialize(rowsCount, colsCount, shipsCounts)
    .then(game => {
      const { id, rows, cols} = game;

      res.json({id, rows, cols});
    })
    .catch(err => errorHandler(err, req, res));
};

/**
 * Evaluate Shot
 * @public
 */
exports.evaluateShot = (req, res) => {
  const {id, row, col} = req.body;

  Game.findById(id)
    .then(game => game.evaluateShot(row, col))
    .then(evaluateResult => res.json(evaluateResult))
    .catch(err => errorHandler(err, req, res));
};

/**
 * Get Cheat
 * @public
 */
exports.getCheat = (req, res) => {
  const id = req.params.id;

  Game.findById(id)
    .then(game => res.json(game.shipsCells))
    .catch(err => errorHandler(err, req, res));
};
