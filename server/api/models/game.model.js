const mongoose = require('mongoose');
const _ = require('lodash');
const APIError = require('../utils/APIError');
const { SHIP_SIZES, LETTERS, RECURSIVE_LIMIT } = require('../utils/constants');

const gameSchema = new mongoose.Schema({
  rows: [String],
  cols: [String],
  ships: mongoose.Schema.Types.Mixed,
  shipsCells: [String],
  hitTracks: [String]
});

const generateShip = (rows, cols, shipType) => {
  const rowsCount = rows.length;
  const colsCount = cols.length;
  const shipSize = SHIP_SIZES[shipType];
  const direction = Math.round(Math.random());
  let ship = null;
  let rowPos = -1;
  let colPos = -1;

  if (direction) {
    rowPos = Math.floor(Math.random() * rowsCount);
    colPos = Math.floor(Math.random() * (colsCount - shipSize + 1));
    ship = cols.slice(colPos, colPos + shipSize).map(col => `${rows[rowPos]}${col}`);
  } else {
    colPos = Math.floor(Math.random() * colsCount);
    rowPos = Math.floor(Math.random() * (rowsCount - shipSize + 1));
    ship = rows.slice(rowPos, rowPos + shipSize).map(row => `${row}${cols[colPos]}`);
  }

  return ship;
};

gameSchema.statics = {
  initialize: function(rowsCount, colsCount, shipsCounts) {
    const rows = LETTERS.substring(0, rowsCount).split('');
    const cols = [...new Array(colsCount).keys()].map(i => (i + 1).toString());
    const countEntries = Object.entries(shipsCounts);
    const hitTracks = [];
    let ships = {};
    let shipsCells = [];
    let generatedShip = null;
    let recursiveCount = 0;

    for (let j = 0; j < countEntries.length; j++) {
      const [shipType, count] = countEntries[j];
      ships[shipType] = [];
  
      for (let i = 0; i < count; i++) {
        recursiveCount = 0;

        do {
          if (recursiveCount >= RECURSIVE_LIMIT) {
            return Promise.reject(new APIError({
              status: 400,
              message: 'Failed to initialize game due to too much load of data! Please try again with small configuration values'
            }));
          }
          recursiveCount++;
          generatedShip = generateShip(rows, cols, shipType);
        }
        while (_.intersection(shipsCells, generatedShip).length > 0);

        shipsCells = [...shipsCells, ...generatedShip];
        ships[shipType].push(generatedShip);
      }
    }

    return this.create({rows, cols, ships, shipsCells, hitTracks});
  }
};

gameSchema.methods = {
  evaluateShot: function(row, col) {
    const cell = `${row}${col}`;

    if (this.rows.indexOf(row) < 0 || this.cols.indexOf(col) < 0) {
      return Promise.reject(new APIError({
        status: 400,
        message: '*** Error! ***'
      }));
    }

    if (this.hitTracks.indexOf(cell) > -1) {
      return Promise.resolve({
        sunk: false,
        attempts: this.hitTracks.length,
        repeat: true
      });
    }

    this.hitTracks.push(cell);

    const sunk = _.intersection(this.shipsCells, this.hitTracks).length === this.shipsCells.length;
    const attempts = this.hitTracks.length;
    const hit = this.shipsCells.indexOf(cell) > -1;

    return this.save()
      .then(() => ({ sunk, attempts, hit }));
  }
};

module.exports = mongoose.model('Game', gameSchema);
