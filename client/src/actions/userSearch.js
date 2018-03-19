import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie'; 
import {FETCH_PROFILE , FETCH_USER,FETCH_BLOCK,FETCH_SUSPEND} from './types'

const API_URL = 'http://localhost:3000/api';
const CLIENT_ROOT_URL = 'http://localhost:3030';
let config = {
  headers : {'Authorization' : cookie.load('token')}
};
export function searchUser({searchBy, searchPara}){
	return function(dispatch){
        console.log('searchUser',searchBy,searchPara);
		axios.post(`${API_URL}/auth/searchuser`, { searchBy, searchPara },config)
    .then(response => {
    	
    		 dispatch({ type: FETCH_USER , 
    		 	payload: response.data.user });

    	})
    .catch((error) => {
    	console.log("error");
    	});
	}
}

export function getUser(uid){
    return function (dispatch) {
    axios.get(`${API_URL}/auth/user/${uid}`,config)
    .then((response) => {
        
      dispatch({
        type: FETCH_PROFILE,
        payload: response.data.user
      });
      // window.location.href = `${CLIENT_ROOT_URL}/dashboard/editprofile`;
    })
    .catch((error)=>{
        console.log(error)
    });
  };
}

export function blockUser(uid,b,i){
  console.log("user");
  return function(dispatch){
   axios.post(`${API_URL}/auth/blockuser/${uid}`,config)
      .then(response =>{
        console.log(response.data);
          dispatch({type:FETCH_BLOCK,
            b:b,
            i:i})
      })
  }
}

export function suspendUser(uid,b,i){
  console.log("user");
  return function(dispatch){
   axios.post(`${API_URL}/auth/suspendUser/${uid}`,config)
      .then(response =>{
        console.log(response.data)
        dispatch({type:FETCH_SUSPEND,
            b:b,
            i:i})
      })
  }
}

