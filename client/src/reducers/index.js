import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';  
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import profileReducer from './profile_reducer';
import memReducer from './member_reducer';
import adm_reducer from './admin_reducer';
import acc_reducer from './acc_reducer';

const rootReducer = combineReducers({  
  auth: authReducer,
  form: formReducer,
  user: userReducer,
  profile: profileReducer,
  amount: memReducer,
  admin:adm_reducer,
  account:acc_reducer

});

export default rootReducer; 