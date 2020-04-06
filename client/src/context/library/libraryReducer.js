import { GET_LIBRARY, CLEAR_ERRORS, LOAD_FAIL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LIBRARY:
      return {
        ...state,
        loading: false,
        artists: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};