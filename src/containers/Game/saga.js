import { take, call, put, fork, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { EVALUATE_SHOT, GET_CHEAT } from 'containers/App/constants';
import { shotEvaluated, shotEvaluatingError, cheatFetched, cheatFetchingError } from 'containers/App/actions';
import { API_BASE } from 'utils/constants';
import request from 'utils/request';

/**
 * Shot evaluation request/response handler
 */
export function* evaluateShot(action) {
  const requestURL = `${API_BASE}/game/evaluateShot`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.shot)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(shotEvaluated(response));
  } catch(err) {
    yield put(shotEvaluatingError(err));
  }
}

export function* evaluateShotWatcher() {
  yield takeLatest(EVALUATE_SHOT, evaluateShot);
}

/**
 * Cheat info request/response handler
 */
export function* getCheat(action) {
  const requestURL = `${API_BASE}/game/cheat/${action.gameId}`;

  try {
    const response = yield call(request, requestURL);
    yield put(cheatFetched(response));
  } catch(err) {
    yield put(cheatFetchingError(err));
  }
}

export function* getCheatWatcher() {
  yield takeLatest(GET_CHEAT, getCheat);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* gameSaga() {
  const watcherA = yield fork(evaluateShotWatcher);
  const watcherB = yield fork(getCheatWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
}
