import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import { AUTH_USER,  
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from './types';

const API_URL = 'http://localhost:3000/api';
const CLIENT_ROOT_URL = 'http://localhost:3030';
let config = {
  headers : {'Authorization' : cookie.load('token')}
};
export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data){
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function loginUser({ email, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(response => {
      console.log(response.data.token);
      cookie.save('token', response.data.token, { path: '/' }); 
      cookie.save('user',response.data) ;  
      dispatch({ type: AUTH_USER });
    //  console.log(CLIENT_ROOT_URL); 
      window.location.href = `${CLIENT_ROOT_URL}/member`;
      
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }

export function registerUser({ email, firstName, password,confpassword,role, branch,contact, accountType, bankName, bankBranch, accountNumber, suspended, blocked,suspended_date }) {  
  return function(dispatch) {
    /*const FirstName = firstName.toUpperCase();
    const Branch = branch.toUpperCase();
    const BankName = bankName.toUpperCase();*/
    axios.post(`${API_URL}/auth/register`, { email,firstName , password, confpassword,role,branch, contact,accountType,bankName , bankBranch, accountNumber, suspended, blocked, suspended_date },config)
    .then(response => {      
      //cookie.save('token', response.data.token, { path: '/' });
      //dispatch({ type: AUTH_USER });
      console.log(response.data.user._id)
      window.location.href = `${CLIENT_ROOT_URL}/dashboard/upload/${response.data.user._id}`;
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser() {  
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });

    window.location.href = `${CLIENT_ROOT_URL}/login`;
  }
}

export function protectedTest() {  
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}
export function updateUser(updateUser,id){
    console.log('update',updateUser,id);
    axios.put(`${API_URL}/auth/editprofile/${id}`,updateUser,config)
      .then(response =>{
        console.log(response.data)
      })
}

