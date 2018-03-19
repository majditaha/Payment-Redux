import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie'; 
import {FETCH_AMT , FETCH_TOTAMT} from './types';

const API_URL = 'http://localhost:3000/api';
const CLIENT_ROOT_URL = 'http://localhost:3030';
let config = {
  headers : {'Authorization' : cookie.load('token')}
};
export function getMemberData(id){
	return function(dispatch){
		axios.get(`${API_URL}/auth/amtcalc/${id}`,config)
    .then(response => {
    	console.log(response.data)
    		 dispatch({ type: FETCH_AMT , 
    		 	payload: response.data.a });

    	})
    .catch((error) => {
    	console.log("error");
    	});
	}
}

export function getTotalAmt(id){
	return function(dispatch){
		axios.get(`${API_URL}/auth/totalamt/$id`,config)
    .then(response => {
    	
    		 dispatch({ type: FETCH_TOTAMT , 
    		 	payload: response.data.totalamt });

    	})
    .catch((error) => {
    	console.log("error");
    	});
	}
}
export function sendWRequest({amount,textMes,name,user_id}){
    return function(dispatch){
        axios.post(`${API_URL}/auth/sendWRequest`,{amount,textMes,name,user_id},config)
        .then(response => {
            console.log("success");
        })
    }
}
