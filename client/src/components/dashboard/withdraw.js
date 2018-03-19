import React, {Component } from 'react'
import { connect } from 'react-redux';
import { Link} from 'react-router';
import { Field, reduxForm } from 'redux-form'; 
import {withdrawUser, check_balance} from '../../actions/admin';
import UserSearch from './UserSearch';
const CLIENT_ROOT_URL = 'http://localhost:3030';
const form = reduxForm({  
  form: 'Withdraw'
});


class Withdraw extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){		
		
		this.props.check_balance(this.props.params.id);

	}
	componentWillUpdate (nextProps, nextState){
		if (nextProps.balance != this.props.balance ) {
		    this.props.check_balance(this.props.params.id);
		    console.log(this.props.balance);
		  }
		

	}

	handleFormSubmit(formProps){		
			console.log("yaha ayo")
		this.props.withdrawUser(formProps,this.props.params.id);
		this.props.closeMo();
	}
  render(){
  	const { handleSubmit } = this.props;
    return(

     
					  <div>
					  <div className="">
					  <h3>Withdraws </h3>
					  <h4 className="alert alert-danger">The total amount can be withdrawn is Rs.<b>{this.props.balance}/- </b></h4>
					  <form className="form-group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} > 
					  	<div className="form-group">
						Enter Your amount to Withdraw : <Field component="input" className="form-control" name="amount"  />
						</div>
						<div className="form-group">
						Withdraw taken by : <Field component="input" className="form-control" name="withdrawnBy"  />
						</div>
						
					<button className="btn btn-success" type="submit">Submit</button>
					</form>
					 </div>
					
					 </div>
					  

      );
  }
}

function mapStateToProps(state) {
	
	
  return {
    
    balance : state.admin.balance.balance
  };
}

export default connect(mapStateToProps, { withdrawUser,check_balance})(form(Withdraw));