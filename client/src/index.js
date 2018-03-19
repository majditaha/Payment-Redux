import React from 'react';  
import ReactDOM from 'react-dom';  
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware ,compose } from 'redux';  
import { Router, browserHistory } from 'react-router';  
import reduxThunk from 'redux-thunk'; 
import cookie from 'react-cookie'; 
import routes from './routes';  
import reducers from './reducers/index';  
import {persistStore , autoRehydrate } from 'redux-persist'
import { AUTH_USER } from './actions/types';

// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);  
const store = compose(autoRehydrate())(createStoreWithMiddleware)(reducers);
persistStore(store);
const token = cookie.load('token');

if (token) {  
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('App'));