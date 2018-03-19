import React, {Component } from 'react'
import { connect } from 'react-redux';
import { Link} from 'react-router';
import { Field, reduxForm } from 'redux-form'; 
import {depositUser} from '../../actions/admin';
import UserSearch from './UserSearch';
const CLIENT_ROOT_URL = 'http://localhost:3030';
const form = reduxForm({  
  form: 'Deposit'
});


class Deposit extends Component {
  constructor(props){
    super(props);

  }

  handleFormSubmit(formProps){    
      
     // this.props.modalIsOpen = false;
    this.props.depositUser(formProps,this.props.params.id);
    this.props.closeMo();
  }
  render(){
    const { handleSubmit } = this.props;
    return(

     
            <div>
            <form className="form-group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} > 
            <div className="form-group">
            <h3> Deposit </h3>
            
              <div className="form-group">
            Enter Your amount to Deposit : <Field component="input" className="form-control" name="amount"  />
            </div>
            
          
           </div>
            <div className=" form-group"><h5>Comment</h5>
              <Field component="textarea" className="form-control" name="despositMes" />
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

export default connect(mapStateToProps, { depositUser})(form(Deposit));