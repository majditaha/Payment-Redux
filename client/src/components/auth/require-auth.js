import React, { Component } from 'react';  
import { connect } from 'react-redux';
import cookie from 'react-cookie';

export default function(ComposedComponent) {  
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/login');
      }
    /*  else if (cookie.load('user').user.role == 'Admin'){
        this.context.router.push('/dashboard')
      }
      else if (cookie.load('user').user.role == 'Member'){
        this.context.router.push('/member')
      }*/
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push('/login');
      }
    /*   else if (cookie.load('user').role == 'Admin'){
        this.context.router.push('/dashboard')
      }
      else if (cookie.load('user').role == 'Member'){
        this.context.router.push('/member')
      }*/
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}