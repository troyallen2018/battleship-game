import { createSelector } from 'reselect';

const selectRoute = state => state.route;
const makeSelectLocation = () => createSelector(
  selectRoute,
  routeState => routeState.location
);

const selectGlobal = state => state.global;
const makeSelectGameInfo = () => createSelector(
  selectGlobal,
  globalState => globalState.gameInfo
);
const makeSelectEvaluationResult = () => createSelector(
  selectGlobal,
  globalState => globalState.evaluationResult
);
const makeSelectCheatInfo = () => createSelector(
  selectGlobal,
  globalState => globalState.cheatInfo
);

export {
  selectGlobal,
  makeSelectGameInfo,
  makeSelectEvaluationResult,
  makeSelectCheatInfo,
  makeSelectLocation
};
