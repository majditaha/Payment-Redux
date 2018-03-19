import React , { Component} from 'react';
import {Link} from "react-router";
import { connect } from 'react-redux';
import { getRequest ,grantReq } from '../../actions/admin'
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

class request extends Component {  
 constructor(props){
  super(props);
    this.state={
        modalIsOpen : false,
        grantId     :''
      }
 }
 componentWillMount(){
 this.props.getRequest();
}

 openModal(test,text) {   
 console.log('openModal',test._id); 
      this.setState({modalIsOpen: true,
                      grantId : test._id})
}
closeModal() {
    this.setState({modalIsOpen: false});
  }
grantAmt(id){
  this.setState({modalIsOpen: false});
 console.log(this.state.grantId)
 this.props.grantReq(this.state.grantId);
}


  render() {
     let popUp = null;
      {popUp = <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}  
              style={customStyles}            
              contentLabel="Example Modal">
              Are you sure you want to grant this request?
        
            <button className="btn btn-info" onClick={this.grantAmt.bind(this)}>Yes</button>
            <button className="btn btn-info" onClick={this.closeModal.bind(this)}>No</button>
           </Modal>;
      }
    return (
      
     <div>     
     {this.props.req.map(u =>
      
      <div>
      <div className= "row">
        <div className="col-md-1">Name   </div>
        <div className="col-md-2">: {u.name} </div>
      </div>

       <div className= "row">
        <div className="col-md-1">  Amount   </div>
        <div className="col-md-2">: {u.amount} </div>
      </div>

      <div className= "row">
        <div className="col-md-1">  Date   </div>
        <div className="col-md-2">: {(new Date(u.date)).toDateString()} </div>
      </div>
      <div className= "row">
        <div className="col-md-1">  Message   </div>
        <div className="col-md-2">: {u.message} </div>
      </div>
    
    <button className="btn btn-success" onClick={this.openModal.bind(this,u)}>Grant</button>
    
      </div>
     
      )}
       {popUp}
      </div>
      
    );
  }
}

function mapStateToProps(state) {
 console.log(state.admin.requestInfo);
  return {
    req:state.admin.requestInfo
  };
}

export default connect(mapStateToProps, {getRequest, grantReq })(request);