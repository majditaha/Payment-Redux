import { FETCH_AMT, FETCH_TOTAMT, ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { amount:'',totamt:'' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_AMT:
      return { ...state, amount: action.payload };
      case FETCH_TOTAMT:
      return { ...state, totamt: action.payload };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
