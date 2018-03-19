import React, {Component } from 'react'
import { connect } from 'react-redux';
import { Link} from 'react-router';
import { Field, reduxForm } from 'redux-form'; 
import {getUser,depositUser} from '../../actions/UserSearch';
import  Modal from 'react-modal';
import UserSearch from './UserSearch';
import Deposit from './deposits';
import Withdraw from './withdraw';
import Balance from './check_balance';
const CLIENT_ROOT_URL = 'http://localhost:3030';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-20%',
    width                 : '35%',
    height                : '60%',
    transform             : 'translate(-50%, -50%)'
  }
};


const renderField = field => (  
    <div>
      <input className="form-control" {...field.input} />    

    </div>
);

class userprofile extends Component {
  constructor(props){
    super(props);
    this.state={
      modalIsOpen : false,
      viewModal : ''
    }
    
  }

  getInitialState() {
    return { modalIsOpen: false };
  }
 
  openModal(test) {
    
      this.setState({modalIsOpen: true,
          viewModal: test});  
    
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed. 
   // this.refs.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
 
componentWillMount(){
  this.props.getUser(this.props.params.id)
  
}
  componentWillUpdate(nextProps){
   // if(this.props.profile != nextProps.profile)
 // this.props.getUser(this.props.params.id)
}
componentWillUpdate(nextProps){
  return(this.props.profile !== nextProps.profile)
}
   render() {
  const cdate = (new Date(this.props.profile.unsuspended_date)).toDateString();
    
      const test1 = true;
  const test = this.state.viewModal;
      //test2 = this.state.test2,
      //test3 = this.state.test2;
      let viewMo = null;
      if (test == 'deposit'){
              viewMo =  <Deposit {...this.props} closeMo = {this.closeModal.bind(this)} />; 
            }
            else if ( test == 'withdraw'){
              viewMo =  <Withdraw {...this.props} closeMo = {this.closeModal.bind(this)} />;
            }
            else if (test == 'balance'){
              viewMo = <Balance {...this.props} closeMo = {this.closeModal.bind(this)} />;
            }
      let testView1 = null;
      if(test1){
        testView1 = <Modal isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal.bind(this)}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel={this.props.profile.firstName}>
            {viewMo}
           </Modal>;
      }
      

   return(
    <div className="row">
      <div className="col-md-4">
        <img src={ '/components/dashboard/' + this.props.params.id + '.jpg' } />
      </div>
      <div className="col-md-4 ">
      <table className="table table-striped">
      <tbody>
        <tr>
          <td>
            <p><b>Name : </b> {this.props.profile.firstName} </p>
          </td>
        </tr>
        <tr>
        <td>
            <p><b>Contact :</b> {this.props.profile.contact} </p>
            </td>
        </tr>
        <tr>
        <td>
            <p><b>Email:</b> {this.props.profile.email}</p>
            </td>
        </tr>
        <tr>
        <td>
            <p><b>Branch:</b> {this.props.profile.branch}</p>
             </td>
        </tr>
        <tr>
        <td>
            <p><b>Account Type:</b> {this.props.profile.accountType}</p>
             </td>
        </tr>
        <tr>
        <td>
            <p><b>Bank Name:</b> {this.props.profile.bankName}</p>
             </td>
        </tr>
        <tr>
        <td>
            <p><b>Bank Branch:</b> {this.props.profile.bankBranch}</p>
             </td>
        </tr>
        <tr>
        <td>
            <p><b>Bank a/c Number:</b> {this.props.profile.accountNumber}</p>
             </td>
        </tr>
        
        <tr>
        <td>
            <p>{this.props.profile.suspended}</p>
             </td>
        </tr>
        <tr>
        <td>
            <button className="btn btn-danger"><a href={`/dashboard/editprofile/${this.props.params.id}`}> Edit</a> </button>
       </td>
        </tr>
        </tbody>
        </table>
      </div>
      
      <div className="col-md-4" viewUser>
        <div className= "sidebar">  
          <button className="btn btn-primary" onClick={this.openModal.bind(this,'deposit')}> Deposit </button>
        </div>
        <div className= "sidebar">
          <button className="btn btn-success" onClick={this.openModal.bind(this,'withdraw')}>withdraw  </button>
        </div>
        <div className= "sidebar">
          <button className="btn btn-info" onClick={this.openModal.bind(this,'balance')}> Balance</button>
        </div>
      </div>
      {testView1}
    </div>

   )
  }
}




function mapStateToProps(state) {
  console.log(state.profile.profile);
  return {
    profile: state.profile.profile
  };
}

export default connect(mapStateToProps,{getUser,depositUser}) (userprofile);