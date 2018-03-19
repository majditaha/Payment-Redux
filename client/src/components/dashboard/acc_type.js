import React, { Component } from 'react';
//import { combineReducers , createStore} from 'react-redux';  
import { connect } from 'react-redux';  
import { Field, reduxForm, reset } from 'redux-form'; 
import { addAcount , getAccountType , deleteAcctype,updateAccount} from '../../actions/admin';
import Modal from'react-modal';

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
  form: 'AccountType'
});
 
const renderField = field => (  
    <div>
      <input className="form-control" {...field.input} />    

    </div>
);


class AccountType extends Component { 
 constructor(props){
    super();
    this.state = {
      typ: '',
      acc : '',
      id : '',
      modalIsOpen : false,
      value : '',
      i:''
    }
  }

  handleAcount(formProps) {
 
    if (this.state.id == ''){
        console.log("formProps",formProps);
      this.props.addAcount(formProps);
       /*window.location.reload(true);*/
     //  this.setState({modalIsOpen: true,value:'added'});
      //window.location.reload(true);
    
    }
    else
    {   
      this.props.updateAccount(formProps,this.state.id,this.state.i)
     
    }
   
  } 
componentWillUpdate(nextProps){
  console.log("new",nextProps.account)
  if(this.props.account !== nextProps.account)
  this.props.account = nextProps.account;
}
  editAccount(a,i) {
  console.log("formProps edit ",a);
    //this.props.editAcctype(id);
    this.setState({
      typ : a.acc_type,
      acc : a.acc_amt,
      id : a._id,
      i:i
    })
  } 

 
  deleteAcount(id,i) {
  console.log("delete ",i);
    this.props.deleteAcctype(id,i);
    this.setState({modalIsOpen: true,value:'deleted'});
     //window.location.reload(true);
   
  } 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

 componentWillMount(){
  this.props.getAccountType();
  console.log(this.props.account);
  
}

componentWillReceiveProps (nextProps,nextState){
  console.log(nextProps.account)
  if(nextProps.account !== this.props.account){
    return true;
  }
  if(nextState !== this.state){
    return true;
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
              Account type successfully {this.state.value}.
        
          
            <button className="btn btn-info" onClick={this.closeModal.bind(this)}>Ok</button>
           </Modal>;
      }
  console.log(this.state);
  return (
    <div>
    <form onSubmit={handleSubmit(this.handleAcount.bind(this))}>
    <div className='row'>
     <div className="col-md-4">
     <label >Account Type</label>
     <Field name="accountType" defaultValue={this.state.typ} className="form-control" component={renderField} type="text"   />
     </div>
     
     <div className="col-md-4">
     <label >Amount</label>
     <Field name="amount" defaultValue={this.state.acc}  className="form-control " component={renderField} type="text" />
     </div>
   
    <div className="col-md-4">
       <button type="submit" className="btn btn-success" > Add </button>
       <button type="submit" className="btn btn-success" > Update </button>
       </div>
       </div>
     </form>

     <div>
          {this.props.account.map((a,i)=>
            <div className='row' key={i}>
            <div className="col-md-4">{a.acc_type}</div>
            <div className="col-md-4">{a.acc_amt}</div>
            <div className="col-md-2"> <button className="btn btn-primary" onClick={this.editAccount.bind(this,a,i)}> Edit </button></div>
            <div className="col-md-2"> <button className="btn btn-danger" onClick={this.deleteAcount.bind(this,a._id,i)}> Delete </button></div>
            </div>
            )}
     </div>
     {popUp}
    </div>
  );
};

 
}

function mapStateToProps(state) {

  return {
    account: state.account
  };
}

export default connect(mapStateToProps, { addAcount,getAccountType,deleteAcctype,updateAccount})(form(AccountType));