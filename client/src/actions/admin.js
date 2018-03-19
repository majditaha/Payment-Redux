import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie'; 
import {FETCH_REQUEST, FETCH_WITHDRAW, FETCH_BALANCE,FETCH_REPORT,FETCH_ACCOUNT,FETCH_ADD_ACCOUNT,FETCH_DELETE,FETCH_UPDATE} from './types';

const API_URL = 'http://localhost:3000/api';
const CLIENT_ROOT_URL = 'http://localhost:3030';
let config = {
  headers : {'Authorization' : cookie.load('token')}
};
export function getRequest(){
	return function(dispatch){
		axios.get(`${API_URL}/auth/viewRequest`,config)
    .then(response => {
    	console.log("yaha ayo");
    	console.log(response.data.requestInfo);
    		 dispatch({ type: FETCH_REQUEST , 
    		 	payload: response.data.requestInfo });

    	})
    .catch((error) => {
    	console.log("error");
    	});
	}
}
export function depositmanual(){
    return function(dispatch){
        axios.get(`${API_URL}/auth/depositmanual`,config)
        .then(response=> {
            console.log(response.data);
        })
    }
}
export function grantReq(id){
	return function(dispatch){
		axios.post(`${API_URL}/auth/confirm`,{id,status:true},config)
    .then(response => {
    	console.log("yaha ayo");
    	;

    	})
    .catch((error) => {
    	console.log("error");
    	});
	}
}

export function getWithdraw(){
	return function(dispatch){
		axios.get(`${API_URL}/auth/viewRequest`,config)
    .then(response => {
    	console.log("yaha ayo");
    	console.log(response.data.requestInfo);
    		 dispatch({ type: FETCH_WITHDRAW , 
    		 	payload: response.data.withdrawInfo });

    	})
    .catch((error) => {
    	console.log("error");
    	});
	}
}
export function withdrawUser(amt,id){
    console.log(id);
    return function(dispatch){
        axios.post(`${API_URL}/auth/withdrawUser/${id}`,amt,config)
        .then(response => {
            console.log("success");
        })
    }
}

export function depositUser(amt,id){
    console.log(id);
    return function(dispatch){
        axios.post(`${API_URL}/auth/depositUser/${id}`,amt,config)
        .then(response => {
            console.log("success");
        })
    }
}

export function check_balance(id){
    return function(dispatch){
        axios.get(`${API_URL}/auth/check_balance/${id}`,config)
            .then(response => {
                console.log(response.data);
               dispatch({ type : FETCH_BALANCE ,
               payload:response.data}) 
            })
    }
}

export function reportByBank(){
    return function(dispatch){
        axios.get(`${API_URL}/auth/reportByBank`,config)
            .then(response => {
                console.log("herer",response.data.user)
                dispatch({ type : FETCH_REPORT ,
                    payload : response.data.user})
            })
            
    }
}
export function reportBySuspend(){
    return function(dispatch){
        axios.get(`${API_URL}/auth/reportBySuspend`,config)
        .then(response => {
            dispatch({
                type: FETCH_REPORT,
                payload : response.data.user
            })
        })
    }
}
export function reportByBranch(){
    return function(dispatch){
        axios.get(`${API_URL}/auth/reportByBranch`,config)
            .then(response => {
                console.log("herer",response.data.user)
                dispatch({ type : FETCH_REPORT ,
                    payload : response.data.user})
            })
            
    }
}

export function addAcount(formsProps){
    console.log("this is test:",formsProps);
    return function(dispatch){
        axios.post(`${API_URL}/auth/acctype`,formsProps,config)
        .then(response => {
            console.log("success",response.data.account);
            dispatch({
                type: FETCH_ADD_ACCOUNT,
                payload:response.data.account
            })
             
        })
    }
}

export function getAccountType(){
    return function(dispatch){
        axios.get(`${API_URL}/auth/acctype`,config)
        .then(response => {
            console.log(response.data);
            dispatch({type : FETCH_ACCOUNT ,
                payload:response.data.account})
        })
    }
}

export function deleteAcctype(id,i){
   
    return function(dispatch){
        dispatch({type : FETCH_DELETE,
                i:i});
        axios.get(`${API_URL}/auth/acctype/${id}`,config)
        .then(response => {
            return function(dispatch){
        axios.get(`${API_URL}/auth/acctype`,config)
        .then(response => {
            console.log("jyfhchtdxg",response.data);
            
        })
    }
        });
        
    }
}
export function updateAccount(updateData,id,i){
    console.log("upadte daat")
   return function(dispatch){    
  axios.put(`${API_URL}/auth/acctype/${id}`,updateData,config)
  .then(response =>{
    console.log(response.data);

  })
  dispatch({type: FETCH_UPDATE,
            i:i,
            payload:updateData
                })
}
}

export function reportByDeposit(){
    return function(dispatch){
        axios.get(`${API_URL}/auth/reportByDeposit`,config)
           .then(response => {
                console.log("herer",response.data.user)
                dispatch({ type : FETCH_REPORT ,
                    payload : response.data.user});
            })
              
       
    }
}
export function reportByWithdraw(){
    return function(dispatch){
        axios.get(`${API_URL}/auth/reportByDeposit`,config)
           .then(response => {
                console.log("herer",response.data.user)
                dispatch({ type : FETCH_REPORT ,
                    payload : response.data.user});
            })
              
       
    }
}