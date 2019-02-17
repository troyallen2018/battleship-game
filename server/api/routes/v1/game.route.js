const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/game.controller');
const { start, evaluateShot } = require('../../validations/game.validation');
const router = express.Router();

router
  .route('/start')
  /**
   * @api {post} v1/game/start Start game
   * @apiDescription Initialize game by setting grid rules and fleet of ships
   * @apiVersion 1.0.0
   * @apiName Start
   * @apiGroup Game
   *
   *
   * @apiParam {Number{5-26}}                    rowsCount         Rows count of grid rules
   * @apiParam {Number{5-50}}                    colsCount         Columns count of grid rules
   * @apiParam {Object}                          shipsCounts       Ships counts
   *
   * @apiSuccess (Created 201) {String}          id                Game Id
   * @apiSuccess (Created 201) {String[]}        rows              Row ids of grid rules
   * @apiSuccess (Created 201) {String[]}        cols              Column ids of grid rules
   *
   * @apiError (Bad Request 400) {String}        validationError   Request payload is invalid
   */
  .post(validate(start), controller.start);

router
  .route('/evaluateShot')
  /**
   * @api {post} v1/game/evaluateShot Evaluate shot
   * @apiDescription Evaluate user's shot by using initialized game info
   * @apiVersion 1.0.0
   * @apiName EvaluateShot
   * @apiGroup Game
   *
   *
   * @apiParam {String}                          id                Game Id
   * @apiParam {String}                          row               Row id of grid rules for this shot
   * @apiParam {String}                          col               Column id of grid rules for this shot
   *
   * @apiSuccess {Boolean}                       sunk              If all battle ships were sunk
   * @apiSuccess {Number}                        attempts          Number of shots so far
   * @apiSuccess {Boolean}                       hit               If the shot was hit or miss
   * @apiSuccess {Boolean}                       repeat            If the shot was already taken before
   *
   * @apiError (Bad Request 400) {String}        validationError   Request payload is invalid
   * @apiError (Not Found 404) {String}          notFound          Game not found
   */
  .post(validate(evaluateShot), controller.evaluateShot);

router
  .route('/cheat/:id')
  /**
   * @api {get} v1/game/cheat/:id Cheat
   * @apiDescription Cheat by getting ships info
   * @apiVersion 1.0.0
   * @apiName Cheat
   * @apiGroup Game
   *
   *
   * @apiParam {String}                          id                Game Id
   *
   * @apiSuccess {Object}                        ships             Ships positions
   *
   * @apiError (Not Found 404) {String}          notFound          Game not found
   */
  .get(controller.getCheat);

module.exports = router;
