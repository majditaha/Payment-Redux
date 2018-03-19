import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import {Link} from "react-router";
import * as actions from '../actions';
import cookie from "react-cookie"
const CLIENT_ROOT_URL = 'http://localhost:3030';
class Member extends Component {

  constructor(props) {
    super(props);
    
   // this.props.protectedTest();
  }

  componentWillMount(){
    console.log(cookie.load('user').user.role)
    if (cookie.load('user').user.role == 'Admin' || cookie.load('user').user.role == 'Teller'){
        window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
  }
}
  renderContent() {    
      return (
        <div>       
        <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <ul className="nav navbar-nav">
            <li><Link to={"/member"}>Home</Link></li>
            <li><Link to={"/member/changePassword"}>Change Password</Link></li>
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

export default connect(mapStateToProps, actions)(Member);  