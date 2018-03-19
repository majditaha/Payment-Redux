import React , {Component} from 'react';
import Modal from 'react-modal';
import Deposit from './deposits';
import Withdraw from './withdraw';
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

class modalex extends Component{
	constructor(props){
		super();
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
	test1(){
		
	}
	test2(){}
	test3(){}
render (){
	const test1 = true;
	const test = this.state.viewModal;
			//test2 = this.state.test2,
			//test3 = this.state.test2;
			let viewMo = null;
			if (test == 'test1'){
          		viewMo =  <Deposit />; 
          	}
          	else if ( test == 'test2'){
          		viewMo =  <Withdraw />;
          	}
			let testView1 = null;
			if(test1){
				testView1 = <Modal isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal.bind(this)}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal">
          	{viewMo}
           </Modal>;
			}
			
	return(
		<div>
		test
		
		<button onClick={this.openModal.bind(this,'test1')}>test 1 </button>
		<button onClick={this.openModal.bind(this,'test2')}>test 2 </button>
		

		
		<div>
			{testView1}
			
		</div>
		</div>
		)
}
}

export default modalex;