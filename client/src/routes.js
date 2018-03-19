import React from 'react';  
import { Route, IndexRoute } from 'react-router';

import App from './components/app';  

import NotFoundPage from './components/pages/not-found-page';

import HomePage from './components/pages/home-page';  
import Register from './components/auth/register';  
import Login from './components/auth/login';  
import Dashboard from './components/dashboard';  
import RequireAuth from './components/auth/require-auth';
import UserSearch from './components/dashboard/UserSearch'
import userprofile from './components/dashboard/userprofile';
import editprofile from './components/dashboard/editprofile';
import deposits from './components/dashboard/deposits';
import balanceU from './components/dashboard/check_balance';
import AccountType from './components/dashboard/acc_type';
import member from './components/member';
import members from './components/member/members';
import sendRequest from './components/member/sendRequest';
import logout from './components/auth/logout';
import account from './components/account';
import main from './components/account/main';
import deposit from './components/account/deposit';
import withdraw from './components/account/withdraw';
import report from './components/dashboard/report';
import balance from './components/account/check';
import request from './components/account/request';
import withdrawUser from './components/dashboard/withdraw';
import upload from './components/auth/upload';
import customField from './components/dashboard/customField';
export default (  
  <Route path="/" component={App}>
    <IndexRoute component={Login} />       
    <Route path="login" component={Login} />
    <Route path="logout" component={logout} />
    
    <Route path="dashboard" component={RequireAuth(Dashboard)}> 
        <IndexRoute component={RequireAuth(UserSearch)} />
        <Route path="userSearch" component={RequireAuth(UserSearch)} />
        <Route path="register" component={Register} />
        <Route path ="upload/:id" component={upload} /> 
        <Route path ="userprofile/:id" component={userprofile} />
        <Route path ="editprofile/:id" component={editprofile} />
        <Route path = "withdraw/:id" component = {withdrawUser} />
        <Route path = "deposit/:id" component = {deposits} />
        <Route path = "balance/:id" component = {balanceU} />
        <Route path ="request" component ={request} />
        <Route path = "report" component ={report} />
        <Route path ="acctype" component={AccountType}/>
        <Route path ="custom" component={customField}/>
        <Route path ="account" component={account}> 
            <IndexRoute component = {main} />
            <Route path = "deposit/:id" component="deposit" />
            <Route path = "withdraw" component="withdraw" />
            <Route path = "balance/:id" component="balance"/>
        </Route >    
    </Route>
        <Route path ="member" component ={RequireAuth(member)}>
        <IndexRoute component={RequireAuth(members)} />
    <Route path ="sendRequest" component = {sendRequest} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);