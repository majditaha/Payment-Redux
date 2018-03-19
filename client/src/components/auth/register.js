import React, { Component } from 'react';  
import { connect } from 'react-redux';  
var Dropzone = require('react-dropzone');
import { Field, reduxForm } from 'redux-form';  
import { registerUser } from '../../actions';
import Modal from'react-modal';
//import { styles } from '../../public';

const form = reduxForm({  
  form: 'register',
  validate
});
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-20%',
    width                 : '500px',
    transform             : 'translate(-50%, -50%)'
  }
};


const renderField = field => (  
    <div>
      <input className="form-control" {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

function validate(formProps) {  
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a full name';
  }
  

  if (!formProps.email ) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.contact) {
    errors.contact = 'Please enter an contact';
  }
  if (!formProps.branch) {
    errors.branch = 'Please enter an branch';
  }
   if (!formProps.accountType) {
    errors.accountType = 'Please enter an Account Type';
  }
   if (!formProps.accountNumber) {
    errors.accountNumber = 'Please enter your Account Number';
  }
   if (!formProps.bankName) {
    errors.bankName = 'Please enter an bank';
  }
   if (formProps.password != formProps.confpassword) {
    errors.confpassword = 'Password  does not match';
  }
  return errors;
}

class Register extends Component {  
  constructor(props){
    super(props);
    this.state={
        modalIsOpen : false
      }
  }

  handleFormSubmit(formProps) {
     this.props.registerUser(formProps);
     this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  Refresh(){
    window.parent.location.reload(true);
  }
  
  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  
  render() {
    const { handleSubmit } = this.props;
     let popUp = null;
      {popUp = <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}  
              style={customStyles}            
              contentLabel="Example Modal">
             You have successfully registered a new user.
  
            <button className="btn btn-info" onClick={this.Refresh.bind(this)}>Add new user</button>
            <button className="btn btn-info" ><a href={`/dashboard`}>Home</a></button>

           </Modal>;
      }

    return (
      <div className="overlay ">
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="overlay-color-theme">
      {this.renderAlert()}
      <div className="row"  >
        <div className="col-md-6" >
        
          <label className="required form-font">Full Name</label>
          <Field name="firstName"  className="form-control  " component={renderField} type="text" />
        </div>   
        <div className="col-md-6">
            <label className="required form-font">Email</label> 
            <Field name="email" className="form-control" component={renderField} type="text" />
          </div>     
      </div>
         <div className="row">
          <div className="col-md-6">
            <label className="asterisk_input form-font">Branch</label>
            <Field name="branch" className="form-control" component = "select">
              <option value="">Select One</option>        
              <option value="kathmandu">Kathmandu</option>
              <option value="pokhara">Pokhara</option>
              <option value="chitwan">Chitwan</option>
              <option value="dharan">Dharan</option>
            </Field>
          </div>
           <div className="col-md-6">
            <label className="required form-font">Account Type</label>
            <Field name="accountType" className="form-control" component="select">
              <option value="">Select One</option>     
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>       
            </Field>
          </div>
        </div>
        <div className="row">
         
        </div>       
        <div className="row">
          <div className="col-md-6">
            <label className="required form-font">Bank Name</label>
            <Field name="bankName" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label className="required form-font">Branch of Bank</label>
            <Field name="bankBranch" className="form-control" component={renderField} type="text" />
          </div>
        </div>
        <div className="row">
          
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="required form-font">Account Number</label>
            <Field name="accountNumber" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label className="required form-font">Contact</label>
            <Field name="contact" className="form-control" component={renderField} type="text" />
          </div>
        </div>
        <div className="row">
             <div className="col-md-6">
            <label className="required form-font">Role</label>
            <Field name="role" className="form-control" component="select">
              <option value="">Select One</option>     
              <option value="Admin">Admin</option>
              <option value="Teller">Teller</option>
              <option value="Member">Member</option>       
            </Field>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="required form-font">Password</label>
            <Field name="password" className="form-control" component={renderField} type="password" />
          </div>
           <div className="col-md-6">
            <label className="required form-font">Confirm Password</label>
            <Field name="confpassword" className="form-control" component={renderField} type="password" />
          </div>
        </div>
       <br>
       </br>
         <div className="row">         
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
     
      </div>
    );
  }
}

function mapStateToProps(state) {  
  console.log(state.auth);
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { registerUser })(form(Register)); 