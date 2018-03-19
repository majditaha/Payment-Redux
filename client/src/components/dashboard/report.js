import React ,{ Component} from 'react'
import { connect } from 'react-redux';
import { reportByBank,reportByBranch,reportByDeposit,reportByWithdraw,reportBySuspend,depositmanual} from '../../actions/admin';
import CsvDownloader from 'react-csv-downloader';
import DepositReport from './depositReport';
import cookie from "react-cookie";


class Report extends Component {
	constructor(props){
		super()
		this.state={
			rep :false,
			reports : '',
			genReport: ''
		}
	}
	byBranch(){
		this.props.reportByBranch();
		this.setState({rep:true,genReport:'byBranch'})
	}
	byDeposit(){
		this.props.reportByDeposit();
		console.log(this.props.user,'byDeposit');
		this.setState({rep:true,genReport:'Deposit By'})
	}
	byWithdraw(){
		this.props.reportByWithdraw();
		this.setState({rep:true,genReport:'Withdrawn By'})
	}
	bySuspend(){
		this.props.reportBySuspend();
		this.setState({rep:true,genReport:'bySuspend'})
	}
	componentWillReceiveProps(nextProps){
		this.setState({reports : nextProps.user})
	}
	componentWillUpdate(nextProps){
		console.log('nextProps',nextProps.user);
	}
	byBank(){
		this.props.reportByBank();
		this.setState({rep:true,genReport:'bySuspend'})
	}
	demo(){
		console.log(this.props.user)

	}
	manualDepo(){
		this.props.depositmanual();
	}
	render(){

		let role = false;
		
		 if (cookie.load('user').user.role == 'Admin'){
        role = true;
         }		
			//const datas = this.state.reports;
			
		const rep = this.state.rep;
		let report = null;
		if(rep){
			
			report =  <DepositReport {...this.state} />;
		}
		return(
				<div className="row">
					<div>
						<button className="btn btn-info" onClick={this.byBranch.bind(this)}>Generate By Branch</button>
						<button className="btn btn-info" onClick={this.byBank.bind(this)}>Generate By Bank </button>
						<button className="btn btn-info" onClick={this.byDeposit.bind(this)}>Deposit Report</button>
						<button className="btn btn-info" onClick={this.byWithdraw.bind(this)}>Withdraw Report</button>
						<button className="btn btn-info" onClick={this.bySuspend.bind(this)}>Report  Suspended</button>
						{role?
<button className="btn btn-info" onClick={this.manualDepo.bind(this)}>Deposit the amount to user</button> : <span></span>
						}
					</div>
					
					{report}
				</div>
			)
	}
}

function mapStateToProps(state) {
	
  return {
    	user : state.admin.report
  };
}

export default connect(mapStateToProps, { reportByBank,reportByBranch ,reportByDeposit, reportByWithdraw,reportBySuspend,depositmanual})(Report);