const User = require('../models/user'),
      config = require('../config/main');
      const setUserInfo = require('../helpers').setUserInfo;
      var ObjectId = require('mongoose').Types.ObjectId;
      var async = require('async');  
 const Request  = require('../models/request');
 const Deposit = require('../models/deposits');
 const Withdrawal = require('../models/withdrawal');
 const Balance = require('../models/balance');
 const Account_type = require('../models/account_type');

 exports.depositmanual = function(req,res){
 	User.find({role:'Teller'},function(err,users){
    	if (err) throw err;
    	var i = 0;
			//while (i < users.length){
			async.whilst(function(){
				return i < users.length;
			},
			function(next){

				var u = users[i];
				userid=users[i]._id;
				Account_type.findOne({acc_type : u.accountType},function(err,acc){
						
				let deposits = new Deposit({
					user_id : users[i]._id,
					amount : 10000
				});
				deposits.save(function(err,dep){
					if(err) throw err;	
						Balance.findOne({user_id:ObjectId(userid)},function(err,bal){
 					if(bal){
 						bal.amount= parseInt(bal.amount) + parseInt(req.body.amount);
 						bal.save(function(err,b){
 							console.log("success");
 						})
 					}
 					else{
 						var balance = new Balance({
 							user_id: userid,
 							amount: parseInt(req.body.amount)
 						});
 						balance.save(function(err,b){
 							console.log("balance save")
 						})
 					}
 				})				
					
				i++
				next();
				})

				})
				

				
			},
			function(err){
				console.log(err)
			})
    }) 
    res.send("succes");
    // console.log('job started');
  
 }