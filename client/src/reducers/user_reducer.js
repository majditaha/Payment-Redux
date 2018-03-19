

import { FETCH_USER, FETCH_BLOCK,FETCH_SUSPEND,ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { user: [], message: '', error: '' };

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      return state= action.payload;
      case FETCH_BLOCK:      
      return [...state.splice(0,action.i),
      				{...state[action.i],
      					blocked: action.b},
      				...state.splice(action.i + 1)
      		]
      case FETCH_SUSPEND:
      		return [...state.splice(0,action.i),
      				{...state[action.i],
      					suspended: action.b},
      			...state.splice(action.i + 1)
      		]

    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
