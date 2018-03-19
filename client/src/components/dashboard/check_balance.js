import React ,{ Component} from 'react'
import { connect } from 'react-redux';
import { reportByBank} from '../../actions/admin';
import { Field, reduxForm } from 'redux-form'; 
import {check_balance} from '../../actions/admin';
import UserSearch from './UserSearch';

class Report extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    	dep:false,
    	wit:false};
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
 componentWillReceiveProps(nextProps){
 	console.log(nextProps.balance);
 }
  open(){
  	this.setState({dep : true});
  }
  withdrawView(){
  	this.setState({wit:true});
  }
  render() {
    
    const dep = this.state.dep;
    const wit = this.state.wit;
   
    
    let deposit = null;
    if(dep){
    	deposit= <div>
			<h3>Deposits</h3>
			<table className="table">
			<tr>
				<th>Date</th>
				<th>Amount</th>
			</tr>
				{this.props.deposits.map(u =>
					<tr>
						<td>{u.date}</td>
						<td>{u.amount}</td>
					</tr>
					
					)}
					</table>
				</div>;
    }
    else {

    	deposit  = <button onClick={this.open.bind(this)}>view deposit</button>;
    }
    let withdraw = null;
    if(wit){
    	withdraw= <div>
			<h3>Withdraws</h3>
			<table className="table">
			<tr>
				<th>Date</th>
				<th>Amount</th>
			</tr>
				{this.props.withdraw.map(u =>
					<tr>
						<td>{u.date}</td>
						<td>{u.amount}</td>
					</tr>
					
					)}
					</table>
				</div>;
    }
    else {

    	withdraw  = <button onClick={this.withdrawView.bind(this)}>view Withdraws</button>;
    }


    return (
      <div>
        
        <div className="row">	
		<h3 className="balance alert alert-info">Balance Rs.{ this.props.balance }</h3>
		
		<div className="col-md-6">
		{deposit}
		</div>	
		<div className="col-md-6">
		{withdraw}
		</div>		 
	 </div>
      </div>
    );
  }
}




function mapStateToProps(state) {
	
  return {
    	balance : state.admin.balance.balance,
	 withdraw : state.admin.balance.withdraw,
	 deposits : state.admin.balance.deposit   
  };
}

export default connect(mapStateToProps, { reportByBank , check_balance })(Report);

