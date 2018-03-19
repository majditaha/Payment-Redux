import React , { Component} from 'react';
import {Link} from "react-router";
import { connect } from 'react-redux';


class account extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){
	//	this.props.getMemberData()
	}
	render(){
		return(
				<div>       
			        <nav className="navbar navbar-success">
			      <div className="container">
			        <div className="">
			          <ul className="nav navbar-nav">
			            <li><Link to={"/dashboard/account/deposit"}>Deposit</Link></li>
			            <li><Link to={"/dashboard/account/withdraw"}>withdraw</Link></li>
			            <li><Link to={"/dashboard/account/balance"}>Check Balance</Link></li>
			            
			          </ul>
			        </div>
			      </div>
			    </nav>
	    <div>
      {this.props.children}
    </div>
        </div>
			)
	}
}

function mapStateToProps(state) {
	
  return {
    
    amount:state.amount.amount
  };
}

export default connect(mapStateToProps)(account);