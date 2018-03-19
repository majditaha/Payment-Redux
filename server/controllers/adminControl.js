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
 
 exports.viewRequest = function(req,res,next){
 	Request.find({status:false},function(err,reqData){
 		if (err) throw err;
 		res.json({
 			requestInfo:reqData});
 	})
 };

 exports.doneRequest = function(req,res,next){
 	console.log(req.body.id);
 	const id = req.body.id ,
 		status = req.body.status;
 		Request.find({_id:id,status:false},function(err,request){
 			console.log(request.user_id);
 			const user_id = request.user_id,
 				amount = parseInt(request.amount);

 			let withdrawal = new Withdrawal({
 				user_id : user_id,
 				amount : amount
 			});
 			withdrawal.save(function(err,data){
 				if(err) throw err;
 				request.status = true;
 			request.save(function(err,data){
 				if (err) throw err;
 				console.log(data);
 			})
 				//res.json({ mes:'success'});
 			})
 			
 		})
 };

 exports.viewWithdraw = function(req,res,next){
 	id = req.params.id;
 	Withdrawal.find({user_id:ObjectId(req.params.id)},function(err,withdraw){
 		if(err) throw err;
 		const withdrawInfo = {
 			id : withdraw._id,
 			amount : withdraw.amount,
 			dateOf : withdraw.date
 		}
 		res.json({
 			withdraw : withdrawInfo
 		})
 	})
 }

 exports.depositAmt = function(req,res,next){
 	const user_id = req.params.id,
 			amount = req.body.amount;
 	let deposit = new Deposit({
 				user_id : user_id,
 				amount : amount
 			});
 			deposit.save(function(err,data){
 				res.json({ mes:'success'});
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
 			})
 }

 exports.checkBalance = function(req,res,next){
 	const id = req.params.id;
 	var dep,w;
 	var deposit = [];
 	var withdraw = [];
 	Deposit.find({user_id:ObjectId(id)},function(err,d){
 		if (err) throw err;
 		dep = d;
 		
 		d.forEach(function(q){
 			var a1 = {
 				date: q.date,
 				amount: q.amount
 			}
 			deposit.push(a1);
 		})
 		var totdepo = 0;
 		var totwit = 0;
 		d.forEach(function(de){
 			totdepo = totdepo + de.amount;
 		})
 		Withdrawal.find({user_id:ObjectId(id)},function(err,w){
 		if(err) throw err;
 		w.forEach(function(q){
 			var a1 = {
 				date: q.date,
 				amount: q.amount
 			}
 			withdraw.push(a1);
 		})

 		wit = w;
 		w.forEach(function(we){
 			totwit = totwit + we.amount;
 		})
 		var balance = {
 			withdraw: withdraw,
 			deposit : deposit,
 			balance : totdepo - totwit
 		}
 		res.json(balance);
 	})
 	});
 	

 	
 }

exports.reportByBank = function(req,res,next){
	var setUserInfo = [];
	User.aggregate([{$sort : {name: -1, bankname : 1} }],function(err,users){
		if (err) throw err;
		console.log(users[0]);
		console.log("comes");
		//users.forEach(function(u){
		//for (var i = 0 ; i < users.length ; i++){
			var i = 0;
			//while (i < users.length){
			async.whilst(function(){
				return i < users.length;
			},
			function(next){
			var u = users[i];
			console.log("enter");
			Deposit.find({user_id:ObjectId(u._id)},function(err,d){
 		if (err) throw err;
 		dep = d;
 		
 		var totdepo = 0;
 		var totwit = 0;
 		d.forEach(function(de){
 			
 			totdepo = totdepo + de.amount;
 		})
 		Withdrawal.find({user_id:ObjectId(u._id)},function(err,w){
 		if(err) throw err;
 		wit = w;
 		w.forEach(function(we){
 			
 			totwit = totwit + we.amount;
 		})
 		var balance = {
 			withdraw: w,
 			deposit : d,
 			balance : totdepo - totwit
 		}
 		setUser = {
 			firstName: u.firstName,   
		    email: u.email,		    
		    contact: u.contact,
		    branch: u.branch,
		    accountType: u.accountType,
		    accountNumber: u.accountNumber,
		    bankName: u.bankName,
		    bankBranch: u.bankBranch,		    		    
		    balance : balance.balance

 		}
 		setUserInfo.push(setUser)
 		console.log(setUser)
 		i++;
			next();
 	})
		});

			if(i == users.length - 1){
				console.log("setUserInfo")
				console.log(setUserInfo)

 		res.json({user : setUserInfo})
			}
			console.log('ya ayo')
			
	},
function (err){
console.log(err);
}
	)

		
})
}

exports.reportByBranch = function(req,res,next){
	var setUserInfo = [];
	User.aggregate([{$sort : {name: -1, branch : 1} }],function(err,users){
		if (err) throw err;
		console.log(users[0]);
		console.log("comes");
		//users.forEach(function(u){
		//for (var i = 0 ; i < users.length ; i++){
			var i = 0;
			//while (i < users.length){
			async.whilst(function(){
				return i < users.length;
			},
			function(next){
			var u = users[i];
			console.log("enter");
			Deposit.find({user_id:ObjectId(u._id)},function(err,d){
 		if (err) throw err;
 		dep = d;
 		
 		var totdepo = 0;
 		var totwit = 0;
 		d.forEach(function(de){
 			
 			totdepo = totdepo + de.amount;
 		})
 		Withdrawal.find({user_id:ObjectId(u._id)},function(err,w){
 		if(err) throw err;
 		wit = w;
 		w.forEach(function(we){
 			
 			totwit = totwit + we.amount;
 		})
 		var balance = {
 			withdraw: w,
 			deposit : d,
 			balance : totdepo - totwit
 		}
 		setUser = {
 			firstName: u.firstName,   
		    email: u.email,		    
		    contact: u.contact,
		    branch: u.branch,
		    accountType: u.accountType,
		    bankName: u.bankName,
		    bankBranch: u.bankBranch,
		    accountNumber: u.accountNumber,		    
		    balance : balance.balance

 		}
 		setUserInfo.push(setUser)
 		console.log(setUser)
 		i++;
			next();
 	})
		});

			if(i == users.length - 1){
				console.log("setUserInfo")
				console.log(setUserInfo)

 		res.json({user : setUserInfo})
			}
			console.log('ya ayo')
			
	},
function (err){
console.log(err);
}
	)

		
})
}
exports.reportBySuspend = function(req,res,next){
	var setUserInfo = [];
	User.find([{$or:{blocked:true,suspended:true}}],function(err,users){
		if (err) throw err;
		console.log(users[0]);
		console.log("comes");
		//users.forEach(function(u){
		//for (var i = 0 ; i < users.length ; i++){
			var i = 0;
			//while (i < users.length){
			async.whilst(function(){
				return i < users.length;
			},
			function(next){
			var u = users[i];
			console.log("enter");
			Deposit.find({user_id:ObjectId(u._id)},function(err,d){
 		if (err) throw err;
 		dep = d;
 		
 		var totdepo = 0;
 		var totwit = 0;
 		d.forEach(function(de){
 			
 			totdepo = totdepo + de.amount;
 		})
 		Withdrawal.find({user_id:ObjectId(u._id)},function(err,w){
 		if(err) throw err;
 		wit = w;
 		w.forEach(function(we){
 			
 			totwit = totwit + we.amount;
 		})
 		var balance = {
 			withdraw: w,
 			deposit : d,
 			balance : totdepo - totwit
 		}
 		setUser = {
 			firstName: u.firstName,   
		    email: u.email,		    
		    contact: u.contact,
		    branch: u.branch,
		    accountType: u.accountType,
		    bankName: u.bankName,
		    bankBranch: u.bankBranch,
		    accountNumber: u.accountNumber,		    
		    balance : balance.balance,
		    supended: u.suspended,
		    blocked:u.blocked,
		    date:u.suspended_date

 		}
 		setUserInfo.push(setUser)
 		console.log(setUser)
 		i++;
			next();
 	})
		});

			if(i == users.length - 1){
				console.log("setUserInfo")
				console.log(setUserInfo)

 		res.json({user : setUserInfo})
			}
			console.log('ya ayo')
			
	},
function (err){
console.log(err);
}
	)

		
})
}

 	

 exports.withdrawUser = function(req,res,next){
 	const id = req.params.id;
 	let withdraw  = new Withdrawal({
 		user_id: id ,
 		amount : req.body.amount
 	});
 	withdraw.save(function(err,data){
 		if (err) throw err;
 			Balance.findOne({user_id:ObjectId(id)},function(err,bal){
 					if(bal){
 						bal.amount= pasrseInt(bal.amount) - parseInt(req.body.amount);
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
 	})
 }

  exports.depositUser = function(req,res,next){
  	console.log("yaha ayo")
 	const id = req.params.id;
 	let deposit  = new Deposit({
 		user_id: id ,
 		amount : req.body.amount
 	});
 	deposit.save(function(err,data){
 		if (err) throw err;
 		console.log(data);
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
 	})
 }

 exports.addAcount = function(req,res,next){
 	Account_type.findOne({acc_type:req.body.accountType},function(err,acco){
 		if(err) throw err;
 		if(acco){
 			 return res.status(422).send({ error: 'That Account Type is already exist.' });
 		}
 	
 	let accountType  = new Account_type({
 		acc_type: req.body.accountType ,
 		acc_amt : req.body.amount
 	});
 	accountType.save(function(err,data){
 		if (err) throw err;
 		res.status(200).json({
			account:data
		})
 	})
 	})
 }

exports.getAccountType= function(req,res,next){	
	Account_type.find(function(err,accountType){
		if (err) throw err;
		console.log(accountType);
		res.status(200).json({
			account:accountType
		})
	})
	
}

exports.deleteAccountType= function(req,res,next){
	Account_type.remove({_id: ObjectId(req.params.id)},function(err,acctype){
		if (err) throw err;
		res.status(200).json({
			msg:"success"
		})
	})
	
}

exports.updateAccountType = function(req,res,next){
	Account_type.findById(ObjectId(req.params.id),function(err,acc){
		if (err) throw err;
		console.log(acc);
		acc.acc_type = req.body.accountType;
		acc.acc_amt = req.body.amount;
		acc.save(function(err){
			if (err) throw err;
			res.json({
				msg:"success"
			})
		})
	})

}




exports.reportByDeposit = function(req,res,next){
 var setUserInf = [];
 console.log('setUserInfo',setUserInfo);
 User.aggregate([{$sort : {name: -1, branch : 1} }],function(err,users){
  if (err) throw err;
  console.log('users',users);
   var i = 0;
   async.whilst(function(){
    return i < users.length;
   },
   function(next){
   var u = users[i];
   Deposit.find({user_id:ObjectId(u._id)},function(err,d){
     if (err) throw err;
     dep = d;
     var deposit = [];
     var depositDate = [],j=0;
     d.forEach(function(de){
      setUser = {
      firstName: u.firstName, 
        contact: u.contact,
        date : de.date,
        amount : de.amount,
        By: de.depositBy
     }
     setUserInf.push(setUser);
      
     })
     /*var amount = [],date = [];
     
     console.log('setuser',setUser)*/
     i++;
     next();
     });

    
    if(i == users.length - 1){
    res.json({user : setUserInf})
    console.log('setuser',setUserInf)
    }
   })
 
   
   
})
}

exports.reportByWithdraw = function(req,res,next){
 var setUserInfo = [];
 User.aggregate([{$sort : {name: -1, branch : 1} }],function(err,users){
  if (err) throw err;
  console.log('comes',users);
   var i = 0;
   async.whilst(function(){
    return i < users.length;
   },
   function(next){
   var u = users[i];
   console.log("enter");
   Withdrawal.find({user_id:ObjectId(u._id)},function(err,w){
     if (err) throw err;
     dep = w;
     console.log('deposit found',w);
     var withdraw = [];
     var wDate = [],j=0;
     w.forEach(function(wt){
      setUser = {
       firstName: u.firstName, 
         contact: u.contact,
         date : wt.date,
         amount : wt.amount,
         By : wt.withdrawnBy
      }
      setUserInfo.push(setUser);
     })
     /*var amount = [],date = [];
     
     
     console.log(setUser)*/
     i++;
     next();
     });
    if(i == users.length - 1){
    res.json({user : setUserInfo})

    }
 
   })
   
 })
}