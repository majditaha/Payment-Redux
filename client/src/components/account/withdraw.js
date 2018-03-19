import React , { Component} from 'react';
import {Link} from "react-router";
import { connect } from 'react-redux';
import { getWithdraw } from '../../actions/admin'
import { Field, reduxForm } from 'redux-form'; 

const form = reduxForm({  
  form: 'withdraw'
});

class withdraw extends Component {  
	constructor(props){
		super(props);
	}
	componentWillMount(){
	this.props.getWithdraw();
}

handleFormSubmit(formProps){    
      console.log("yaha ayo")
    this.props.withdrawUser(formProps,this.props.params.id);
  }

  render() {
const { handleSubmit } = this.props;
    return (
    	<div>    	
    	 <form onSubmit = {handleSubmit(this.viewUserList.bind(this))} className="form-inline">
          <div className="form-group">
           <Field name="searchBy" className="form-control" component="select" type="text" >
            <option value="withdrawByBranch">Withdraw By Branch</option>
            <option value="withdrawByAccountType">Withdraw By Account Type</option>
            <option value="Bymanual">By Manual</option>
          </Field>
          </div>
          
          <div className="form-group">
            
            <Field name="amount" className="form-control" component="input" type="text" placeholder="amount"/>
                </div>
                
          <button className="btn btn-success" type="submit">Submit</button>
          </form>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
	//console.log(state.admin.requestInfo);
  return {
    wit:state.admin.wit
  };
}

export default connect(mapStateToProps, {getWithdraw })(form(withdraw));