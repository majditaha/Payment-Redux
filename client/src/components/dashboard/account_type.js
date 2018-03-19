import React , { Component} from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router';
import { Field, reduxForm } from 'redux-form'; 
import {withdrawUser} from '../../actions/admin';
import UserSearch from './UserSearch';
const CLIENT_ROOT_URL = 'http://localhost:3030';
const form = reduxForm({  
  form: 'Account'
});


class Account extends Component{
	constructor(props){
		super(props);
	}

	handleFormSubmit(formProps){		
			console.log("yaha ayo")
		this.props.withdrawUser(formProps,this.props.params.id);
	}
  render(){
  	const { handleSubmit } = this.props;
    return(    
					  
					  <div className="col-md-4">
					  <h3>Account Type </h3>
					  <form className="form-group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} > 
					  	<div className="form-group">
						Enter Your amount to Withdraw : <Field component="input" name="amount"  />
						</div>
						<div className="form-group">
						Withdraw taken by : <Field component="input" name="withdrawnBy"  />
						</div>
						
					<button className="btn btn-success" type="submit">Submit</button>
					</form>
					 </div>
					 
					  

      );
  }
}

function mapStateToProps(state) {
	
	
  return {
    
    
  };
}

export default connect(mapStateToProps, { })(form(Account));