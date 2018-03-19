import React, {Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 
import {getUser} from '../../actions/UserSearch';
import UserSearch from './UserSearch';
import { updateUser } from '../../actions';
import Modal from'react-modal';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const API_URL = 'http://localhost:3000/api';
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

const form = reduxForm({
  form: 'editprofile'
});
const renderField = field => (  
    <div>
      <input className="form-control" {...field.input} />    

    </div>
);

class editprofile extends Component {
  constructor(props){
    super(props);
    this.state={
        modalIsOpen : false
      }
    
  }

componentWillMount(){
  this.props.getUser(this.props.params.id)
  
}
componentWillUpdate(){
  this.props.getUser(this.props.params.id)
}
componentWillReceiveProps(nextProps){
  this.props.getUser(this.props.params.id)

}
getInitialState() {
        return {
          files: []
        };
    }

    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      this.setState({
        files: acceptedFiles
      });
      var photo = new FormData();
        photo.append('photo',acceptedFiles[0]);

        request.post(`${API_URL}/auth/upload/${this.props.params.id}`).send(photo)
        .end(function(err,res){
          if (err){console.log(err);}
          return res;
        });
    }


handleFormSubmit(formProps) {
  //console.log(formProps ,'this.state.id ');
    this.props.updateUser(formProps,this.props.params.id);
    this.setState({modalIsOpen: true});
  }

    closeModal() {
    this.setState({modalIsOpen: false});
}
  
   render() {
     const { handleSubmit } = this.props;
     let popUp = null;
      {popUp = <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}  
              style={customStyles}            
              contentLabel="Example Modal">
             You have successfully edited the existing user profile.
  
            <button className="btn btn-info" onClick={this.closeModal.bind(this)}>Ok</button>
           </Modal>;
      }

     var suspend;
     console.log('checkbox',this.props.profile.suspended);
     if(this.props.profile.suspended){
      suspend = "checked";
     }
 
   return(
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
    <div className="row">
        <div className="col-md-6">
          <label>Full Name</label>
          <Field name="firstName" className="form-control" component={renderField} type="text" defaultValue={this.props.profile.firstName}/>
        </div> 
        <div className="col-md-6">
          <label>Email</label>
          <Field name="email" className="form-control" component={renderField} type="text" defaultValue={this.props.profile.email}/>
        </div> 
    </div>
     <div className="row">
          <div className="col-md-6">
            <label>Branch</label>
            <Field name="branch" className="form-control"component ="select" defaultValue={this.props.profile.branch}>
              <option value="">Select One</option>        
              <option value="KATHMANDU">Kathmandu</option>
              <option value="POKHARA">Pokhara</option>
              <option value="CHITWAN">Chitwan</option>
              <option value="DHARAN">Dharan</option>
            </Field>
          </div>
          <div className="col-md-6">
            <label>Account Type</label>
            <Field name="accountType" className="form-control" component="select" defaultValue={this.props.profile.accountType}>
              <option value="">Select One</option>     
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>       
            </Field>
          </div>
        </div>
    <div className="row">
        <div className="col-md-6">
          <label>Bank Name</label>
          <Field name="bankName" className="form-control" component={renderField} type="text" defaultValue={this.props.profile.bankName}/>
        </div> 
        <div className="col-md-6">
          <label>Branch of Bank</label>
          <Field name="bankBranch" className="form-control" component={renderField} type="text" defaultValue={this.props.profile.bankBranch}/>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-6">
          <label>Account Number</label>
          <Field name="accountNumber" className="form-control" component={renderField} type="text" defaultValue={this.props.profile.accountNumber}/>
        </div> 
        <div className="col-md-6">
          <label>Contact Number</label>
          <Field name="contact" className="form-control" component={renderField} type="text" defaultValue={this.props.profile.contact}/>
        </div> 
    </div>
    <div className="row">
    <Dropzone onDrop={this.onDrop.bind(this)}
                     className='dropzone'
                    activeClassName='active-dropzone'
                    multiple={false} >
              <div>Click to update image files.</div>
            </Dropzone>
                
    </div>
    <button type="submit" className="btn btn-primary">Update</button>
    {popUp}
    </form>

   )
  }
}


function mapStateToProps(state) {
  console.log(state.profile)
  return {
    profile: state.profile.profile
  };
}

export default connect(mapStateToProps,{getUser,updateUser}) (form(editprofile));