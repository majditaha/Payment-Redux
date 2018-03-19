
import React , { Component} from 'react';
import {Link} from "react-router";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  
import { sendWRequest ,getTotalAmt} from '../../actions/calculate';
import cookie from 'react-cookie'

const form = reduxForm({  
  form: 'sendRequest'
});

class sendRequest extends Component {
	constructor(props){
		super(props);
		this.state={
			textMes:''
		}
	}
	componentWillMount(){
		//this.props.getTotalAmt(cookie.load('user').user._id)
	}
	//submitRequest(e){
	//	console.log(e.target.name);
	//	console.log(e.target.value);
		//this.setState = {
		//	textMes: 
		//}
	//}
	handleFormSubmit(formProps){
		console.log(cookie.load('user'))
		if(parseInt(formProps.amount) > this.props.amount){
			alert("The amount must be less than or equal to " + this.props.amount);
			return;
		}
		//formProps.amount = this.props.amount;
		formProps.name = cookie.load('user').user.firstName;
		formProps.user_id = cookie.load('user').user._id;
		console.log( cookie.load('user').user._id);
		//formProps.user_id = cookie.load('user').user.id;
		this.props.sendWRequest(formProps);
	}
	render(){
		const { handleSubmit } = this.props;
		return(
				<div className="container">
					  <div className="col-md-4"></div>
					  <div className="col-md-4">
					  <div><h3> Your total Amount Limit is Rs.{this.props.amount}/- </h3></div>
					  <form className="form-group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} > 
					  	<div className="form-group">
						Your total amount requested is : <Field component="input" initialValues = {this.props.amount} name="amount" />
						</div>
						Your Message
						<div className="form-group">
							<Field rows="4" cols="50" name="textMes" component="textarea"  />
						</div>
					<button className="btn btn-success" type="submit">Submit Request</button>
					</form>
					 </div>
					  <div className="col-md-4"></div>
					  </div>
			)
	}
}

function mapStateToProps(state) {	
	
  return {
    
    amount:state.amount.amount
  };
}

export default connect(mapStateToProps, {sendWRequest, getTotalAmt })(form(sendRequest));