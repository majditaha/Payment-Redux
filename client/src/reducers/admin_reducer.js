import { FETCH_REQUEST, FETCH_WITHDRAW ,FETCH_BALANCE,FETCH_REPORT,FETCH_ACCOUNT,FETCH_ADD_ACCOUNT,ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { requestInfo :[] ,withdrawInfo:[],balance:{},report:[],account:[]};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, requestInfo: action.payload };

    case FETCH_WITHDRAW:
    	return {...state, withdrawInfo: action.payload};
    case FETCH_BALANCE:
      	return {...state, balance: action.payload};
    case FETCH_REPORT:
      return {...state,report:action.payload};
   
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
