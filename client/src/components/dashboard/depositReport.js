import React ,{ Component} from 'react'
import { connect } from 'react-redux';
//import { reportByBank,reportByBranch,reportByDeposit} from '../../actions/admin';
import CsvDownloader from 'react-csv-downloader';

class depositReport extends Component {

	constructor(props){
		super(props);
		
	}
componentWillMount(){
	console.log('componentWillMount');
}

render(){
	let columns = [];
	var datas= '';
if (this.props.genReport == 'byBranch')
{
	console.log('byBranch');
	 columns = [{
			  id: 'firstName',
			  displayName: 'Name'
			}, {
			  id: 'email',
			  displayName: 'Email'
			},{

			  id: 'contact',
			  displayName: 'Contact'
			},{

			  id: 'accountType',
			  displayName: 'Email'
			},{

			  id: 'accountNumber',
			  displayName: 'Account Type'
			},{

			  id: 'bankName',
			  displayName: 'Bank Name'
			},{

			  id: 'branchName',
			  displayName: 'Branch Name'
			},{

			  id: 'balance',
			  displayName: 'Balance'
			}];
			 datas = this.props.reports;
}
else if (this.props.genReport == 'bySuspend'){
	console.log('byBranch');
	 columns = [{
			  id: 'firstName',
			  displayName: 'Name'
			}, {
			  id: 'email',
			  displayName: 'Email'
			},{

			  id: 'contact',
			  displayName: 'Contact'
			},{

			  id: 'accountType',
			  displayName: 'Email'
			},{

			  id: 'accountNumber',
			  displayName: 'Account Type'
			},{

			  id: 'bankName',
			  displayName: 'Bank Name'
			},{

			  id: 'branchName',
			  displayName: 'Branch Name'
			},{

			  id: 'balance',
			  displayName: 'Balance'
			},
			{
				id: 'blocked',
				displayName: 'Block Status'
			},
			{
				id:'suspended',
				displayName:' Suspend Status'
			},
			{
				id:'date',
				displayName:'Date (suspended | Blocked)'
			}];
			 datas = this.props.reports;
}

else if (this.props.genReport == 'Deposit By' || this.props.genReport == 'Withdrawn By'){
 columns = [{
			  id: 'firstName',
			  displayName: 'Name'
			}, {
			  
			  id: 'contact',
			  displayName: 'Contact'
			},{

			  id: 'date',
			  displayName: 'Date'
			},{

			  id: 'amount',
			  displayName: 'Amount'
			},
			{
				id:'By',
				displayName: 'By'
			}];
		
			 datas = this.props.reports;
		}
return(
		 <div>
		 <CsvDownloader
	        filename="report"
	        separator=","
	        columns={columns}
	        datas={datas}
	        text="DOWNLOAD" />
    	</div>
    )
}
}

function mapStateToProps(state) {
	
  return {
    	user : state.admin.report
  };
}

export default connect(mapStateToProps,{})(depositReport);