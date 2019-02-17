const Joi = require('joi');
const {
  MIN_ROWS_COUNT,
  MAX_ROWS_COUNT,
  MIN_COLS_COUNT,
  MAX_COLS_COUNT,
  SHIP_TYPES
} = require('../utils/constants');

module.exports = {
  // POST v1/game/start
  start: {
    body: {
      rowsCount: Joi.number().min(MIN_ROWS_COUNT).max(MAX_ROWS_COUNT),
      colsCount: Joi.number().min(MIN_COLS_COUNT).max(MAX_COLS_COUNT),
      shipsCounts: Joi.object().keys({
        [SHIP_TYPES.CARRIER]: Joi.number(),
        [SHIP_TYPES.BATTLESHIP]: Joi.number(),
        [SHIP_TYPES.CRUISER]: Joi.number(),
        [SHIP_TYPES.DESTROYER]: Joi.number(),
        [SHIP_TYPES.SUBMARINE]: Joi.number()
      })
    },
  },

  // POST v1/game/evaluateShot
  evaluateShot: {
    body: {
      id: Joi.string().required(),
      row: Joi.string().required(),
      col: Joi.string().required()
    },
  }
};
