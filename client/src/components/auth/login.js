import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';  
import { Link } from 'react-router';  
import { loginUser } from '../../actions';

const form = reduxForm({  
  form: 'login'
});

class Login extends Component {  
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
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

    return (
      <div className="col-md-4 col-md-offset-4 col-sm-6">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-signin">
        {this.renderAlert()}
          <div className="form-group">
            <label className="required "><strong>Emainl</strong></label>
            <Field name="email" className="form-control" component="input" type="text" placeholder="Enter Email" />
          </div>
          <div className="form-group">
            <label className="required "><strong>Password</strong></label>
            <Field name="password" className="form-control" component="input" type="password" placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));