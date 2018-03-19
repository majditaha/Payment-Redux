import React , { Component} from 'react';
import {Link} from "react-router";
import { connect } from 'react-redux';
import { getMemberData } from '../../actions/calculate'
import cookie from 'react-cookie'

class members extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){
		this.props.getMemberData(cookie.load('user').user._id);
	}
	render(){
		return(
				<div className="container">
							  
							  <div className="col-md-4 col-md-offset-4">
								<strong>Your amount collected:<span className="badge"></span>{this.props.amount} </strong> <br />

								 <a href={`/member/sendRequest`} className="btn btn-primary">Withdraw your amount</a>


							 </div>
							  
      </div>
			)
	}
}

function mapStateToProps(state) {
	console.log(state.amount);
  return {
    
    amount:state.amount.amount
  };
}

export default connect(mapStateToProps, {getMemberData })(members);