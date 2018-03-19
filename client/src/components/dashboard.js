import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import {Link} from "react-router";
import * as actions from '../actions';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    
   // this.props.protectedTest();
  }

  renderContent() {    
      return (
        <div>       
        <nav className="navbar ">
      <div className="container">
        <div className="navbar-header ">
          <ul className="nav navbar-nav ">
            <li className="navbar123"><Link to={"/dashboard"}>Dashboard</Link></li>
            <li><Link to={"/dashboard/register"}>Add New User</Link></li>
            <li><Link to={"/dashboard/acctype"}>Account</Link></li>
            <li><Link to={"/dashboard/request"}>Requests</Link></li>
            <li><Link to ={"/dashboard/report"}>Report</Link></li>
            <li> <Link to ={"/dashboard/custom"}>Custom CSV Upload</Link></li>
            <li><Link to={"/logout"}>Logout</Link></li>
          </ul>
        </div>
      </div>
    </nav>
    <div>
      {this.props.children}
    </div>
        </div>
      );
    }
  

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Dashboard);  