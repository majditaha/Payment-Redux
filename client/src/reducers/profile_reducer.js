import { FETCH_PROFILE, ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { profile: {}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, profile: action.payload };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
