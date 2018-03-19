import React, {Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 
import {Link} from "react-router";
import cookie from "react-cookie";
var Modal = require('react-modal');
import { searchUser , getUser , blockUser ,suspendUser} from '../../actions/UserSearch'

const form = reduxForm({
	form: 'UserSearch'
});

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



class UserSearch extends Component{
	constructor(props){
		super();
		this.state={
	      modalIsOpen : false,
	      viewModal : '',
	      id1:'',
	      block: '',
	      i:0,
	      b:false
	    }
	}


	viewUserList(formProps) {
    this.props.searchUser(formProps)
    
  }
  viewUser(){
  	
  }
  editUser(id){
  	this.props.getUser(id)
  }

   openModal(test,i) {    
   	  this.setState({modalIsOpen: true,
      viewModal: test._id,
  	  id1 : test._id,
  	  block: test.blocked ? 'unblock' : 'block'	,
  	  i:i,
  	  b:test.blocked ? false : true});  
    console.log('kjij',this.state.b); 
    
  }
  openModal1(test,i) {    
   	  this.setState({modalIsOpen: true,
      viewModal: test._id,
  	  id1 : test._id,
  	  block: test.blocked ? 'unsuspend' : 'suspend',
  	  i:i ,
  	  b:test.blocked ? false : true	});  
    console.log(this.state.block);
  }
  setBlockValue(){
  		this.setState({modalIsOpen: false
  			});
  		console.log('block value',this.state.id1);
  		
  		if (this.state.block == 'block' || this.state.block == 'unblock')	{
  			this.props.blockUser(this.state.id1,this.state.b,this.state.i);
  		}	else if (this.state.block == 'suspend' || this.state.block == 'unsuspend'){
  			this.props.suspendUser(this.state.id1,this.state.b,this.state.i);
  		}
  		 
  		  
  }
  block(u,i){
  	this.props.blockUser(u._id,u,i)
  }
  suspend(u,i){
  	this.props.suspendUser(u._id,u,i)
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentWillReceiveProps(nextProps){
 // return(	this.props.user !== nextProps.user)
  	
  }
  
	render(){
		let role = true;
		
		 if (cookie.load('user').user.role == 'Teller'){
        role = false;
        
  }
		let block = "";
		let bl='';
		let sp= '';
		const { handleSubmit } = this.props;
		const test = this.state.viewModal;
		let popUp = null;
		 {popUp = <Modal
         isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
           style={customStyles}
          contentLabel="Example Modal">
          Are you sure you want to {this.state.block} this user?
        
            <button className="btn btn-info" onClick={this.setBlockValue.bind(this)}>Yes</button>
			<button className="btn btn-info" onClick={this.closeModal.bind(this)}>Cancel</button>
           </Modal>;}
          
		return(
		<div>
			<form onSubmit = {handleSubmit(this.viewUserList.bind(this))} className="form-inline row">
				
					
					<fieldset className="form-group col-md-4" >
            	<label> <strong>Name/Branch/Bank</strong></label>
           		 <Field name="searchPara" className="form-control" component="input" type="text" />
          			</fieldset>
          			<fieldset className="form-group col-md-3">
          			<label><strong>Search By</strong></label>
					 <Field name="searchBy" className="form-control" component="select" type="text" >
						<option value="searchByName">For Name</option>
						<option value="searchByBranch">For Branch</option>
						<option value="searchByBank">For Bank</option>
					</Field>
					</fieldset>
					<fieldset className="form-group col-md-2 ">
					<button className="btn btn-success" type="submit">Search</button>
					</fieldset>
					</form>
					<div>
		 			<table className="table table-striped">
		 		<thead>
				<tr>
					<th>Name</th>
					<th>Contact</th>
					<th>Branch</th>
					<th>Bank Name</th>
					<th>Account Number</th>
					<th>Branch Of Bank</th>
					<th>Suspended Status</th>
					
				</tr>
				</thead>
				<tbody>
				{
		 				this.props.user.map((u,i) =>
		 				
		 				 <tr className ={u.blocked ? 'alert alert-danger': u.suspended ? 'alert alert-warning' : ''} key={i}>
		 					

				
		 				
					<td>{u.firstName}</td>
					<td>{u.contact}</td>
					<td>{u.branch}</td>
					<td>{u.bankName}</td>
					<td>{u._id}</td>
					<td>{u.bankBranch}</td>
					<td>{u.suspended ? 'true' : 'false'}</td>
					
					<td><button className="btn btn-info"><a href={`/dashboard/userprofile/${u._id}`}>View</a></button>
						 <button className="btn btn-success" ><a href={`/dashboard/editprofile/${u._id}`}>Edit</a></button>
						 {role?<span> <button className="btn btn-danger" onClick={this.block.bind(this,u,i)}>{u.blocked ? 'Unblock' : 'Block' }</button>
						 <button className="btn btn-danger" onClick={this.suspend.bind(this,u,i)}>{u.suspended ? 'Unsuspend' : 'Suspend' }</button></span>: ''}
						 
						 </td>

				</tr>
				)
		 			}
		 		</tbody>
				</table>
		 		 </div>
				{popUp}
				</div>
			)
	}
}

function mapStateToProps(state) {
	
  return {
    user: state.user,
    profile:state.profile.user
  };
}

export default connect(mapStateToProps, { searchUser, getUser ,blockUser ,suspendUser})(form(UserSearch));