import {
  START,
  START_SUCCESS,
  START_ERROR,
  EVALUATE_SHOT,
  EVALUATE_SHOT_SUCCESS,
  EVALUATE_SHOT_ERROR,
  GET_CHEAT,
  GET_CHEAT_SUCCESS,
  GET_CHEAT_ERROR
} from './constants';

/**
 * Initialize game, this action starts the request saga
 *
 * @return {object} An action object with a type of START
 */
export function initializeGame(initConfig) {
  return {
    type: START,
    initConfig
  };
}

/**
 * Dispatched when the game is initialized by the request saga
 *
 * @param  {object} gameInfo Initialized game info
 *
 * @return {object} An action object with a type of START_SUCCESS passing the gameInfo
 */
export function gameInitialized(gameInfo) {
  return {
    type: START_SUCCESS,
    gameInfo
  };
}

/**
 * Dispatched when starting game fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of START_ERROR passing the error
 */
export function gameInitializingError(error) {
  return {
    type: START_ERROR,
    error
  };
}

/**
 * Evaluate shot, this action starts the request saga
 *
 * @return {object} An action object with a type of EVALUATE_SHOT
 */
export function evaluateShot(shot) {
  return {
    type: EVALUATE_SHOT,
    shot
  };
}

/**
 * Dispatched when the shot is evaluated by the request saga
 *
 * @param  {object} evaluationResult Evaluation result
 *
 * @return {object} An action object with a type of EVALUATE_SHOT_SUCCESS passing the evaluationResult
 */
export function shotEvaluated(evaluationResult) {
  return {
    type: EVALUATE_SHOT_SUCCESS,
    evaluationResult
  };
}

/**
 * Dispatched when evaluating shot fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of EVALUATE_SHOT_ERROR passing the error
 */
export function shotEvaluatingError(error) {
  return {
    type: EVALUATE_SHOT_ERROR,
    error
  };
}

/**
 * Get cheat info, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_CHEAT
 */
export function getCheat(gameId) {
  return {
    type: GET_CHEAT,
    gameId
  };
}

/**
 * Dispatched when the cheat info is fetched by the request saga
 *
 * @param  {object} cheatInfo Cheat info
 *
 * @return {object} An action object with a type of GET_CHEAT_SUCCESS passing the cheatInfo
 */
export function cheatFetched(cheatInfo) {
  return {
    type: GET_CHEAT_SUCCESS,
    cheatInfo
  };
}

/**
 * Dispatched when fetching cheat info fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_CHEAT_ERROR passing the error
 */
export function cheatFetchingError(error) {
  return {
    type: GET_CHEAT_ERROR,
    error
  };
}
