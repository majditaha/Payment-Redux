import { FETCH_ACCOUNT,FETCH_ADD_ACCOUNT,FETCH_DELETE,FETCH_UPDATE,ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { account:[]};

export default function (state = [], action) {
  switch (action.type) {    
    case FETCH_ACCOUNT:
        return state=action.payload;
     case FETCH_ADD_ACCOUNT:  
       return[
          ...state,
          {
            acc_type:action.payload.acc_type,
            acc_amt:action.payload.acc_amt
          }
          ]
       ;
    case FETCH_DELETE:
    console.log("delete reducer");
      return[
        ...state.slice(0,action.i),
        ...state.slice(action.i + 1)
      ];
    case FETCH_UPDATE:    
      return [...state.slice(0,action.i),
              {  ...state[action.i],
                acc_type:action.payload.accountType,
                acc_amt : action.payload.amount
              },
              ...state.slice(action.i + 1)];
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  
}
  return state;
}

