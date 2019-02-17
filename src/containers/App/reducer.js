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

const initialState = {
  gameInfo: {
    loading: false,
    error: false,
    data: false
  },
  evaluationResult: {
    loading: false,
    error: false,
    data: false
  },
  cheatInfo: {
    loading: false,
    error: false,
    data: false
  }
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        ...state,
        gameInfo: {
          loading: true,
          error: false,
          data: false
        },
        evaluationResult: {
          loading: false,
          error: false,
          data: false
        },
        cheatInfo: {
          loading: false,
          error: false,
          data: false
        }
      };
    case START_SUCCESS:
      return {
        ...state,
        gameInfo: {
          loading: false,
          error: false,
          data: action.gameInfo
        }
      };
    case START_ERROR:
      return {
        ...state,
        gameInfo: {
          loading: false,
          error: action.error,
          data: false
        }
      };
    case EVALUATE_SHOT:
      return {
        ...state,
        evaluationResult: {
          loading: true,
          error: false,
          data: false
        }
      };
    case EVALUATE_SHOT_SUCCESS:
      return {
        ...state,
        evaluationResult: {
          loading: false,
          error: false,
          data: action.evaluationResult
        }
      };
    case EVALUATE_SHOT_ERROR:
      return {
        ...state,
        evaluationResult: {
          loading: false,
          error: action.error,
          data: false
        }
      };
    case GET_CHEAT:
      return {
        ...state,
        cheatInfo: {
          loading: true,
          error: false,
          data: false
        }
      };
    case GET_CHEAT_SUCCESS:
      return {
        ...state,
        cheatInfo: {
          loading: false,
          error: false,
          data: action.cheatInfo
        }
      };
    case GET_CHEAT_ERROR:
      return {
        ...state,
        cheatInfo: {
          loading: false,
          error: action.error,
          data: false
        }
      };
    
    default:
      return state;
  }
}

export default appReducer;
