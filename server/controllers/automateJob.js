var CronJob = require('cron').CronJob;
var User = require('../models/user');
var Deposit = require('../models/deposits');
var Withdraw = require('../models/withdrawal');
var Account_type = require('../models/account_type');
    var async = require('async');  


var job = new CronJob({
  cronTime: '0 0 0 1 * *',
  onTick: function() {
  	
    User.find(function(err,users){
    	if (err) throw err;
    	var i = 0;
			//while (i < users.length){
			async.whilst(function(){
				return i < users.length;
			},
			function(next){

				var u = users[i];
				Account_type.findOne({acc_type : u.accountType},function(err,acc){
						
				let deposits = new Deposit({
					user_id : users[i]._id,
					amount : parseInt(acc.acc_amt)
				});
				deposits.save(function(err,dep){
					if(err) throw err;	
						Balance.findOne({user_id:ObjectId(id)},function(err,bal){
 					if(bal){
 						bal.amount= parseInt(bal.amount) + parseInt(req.body.amount);
 						bal.save(function(err,b){
 							console.log("success");
 						})
 					}
 					else{
 						var balance = new Balance({
 							user_id: id,
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
    // console.log('job started');
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

job.start();
module.exports= job;