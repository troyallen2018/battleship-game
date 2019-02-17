import { call, put, takeLatest } from 'redux-saga/effects';
import { START } from 'containers/App/constants';
import { gameInitialized, gameInitializingError } from 'containers/App/actions';
import { API_BASE } from 'utils/constants';
import request from 'utils/request';

/**
 * Game Info request/response handler
 */
export function* initializeGame(action) {
  const requestURL = `${API_BASE}/game/start`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.initConfig)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(gameInitialized(response));
  } catch(err) {
    yield put(gameInitializingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* initializeGameWatcher() {
  yield takeLatest(START, initializeGame);
}
