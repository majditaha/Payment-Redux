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

			var d = new Date();
					var n = d.getMonth();
					var y = d.getFullYear();
				console.log(n)
				if(n==0){
					n = 12;
					y = y-1 ;
				}
				else {
					n = n+1;
					
					console.log(y)
				}
				Deposit.find({date:{$lt : new Date(), $gte: new Date(y,n)}},function(err,depos){
					if(err) throw err;
					console.log("jvhc",depos);
					var j = 0;
					async.whilst(function(){
						return j < depos.length;
					},
					function(next){
						depos[j].status = true;
						depos[j].save(function(err,d){
							if(err) throw err;
							
						})
						j++;
						next()
					})
				})
				Withdraw.find({date:{$lt : new Date(), $gte: new Date(y,n)}},function(err,depos){
					if(err) throw err;					
					var j = 0;
					async.whilst(function(){
						return j < depos.length;
					},
					function(next){
						depos[j].status = true;
						depos[j].save(function(err,d){
							if(err) throw err;
							
						})
						j++;
						next()
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