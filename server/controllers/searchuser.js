const User = require('../models/user'),
	  config = require('../config/main');
      const setUserInfo = require('../helpers').setUserInfo;
      var ObjectId = require('mongoose').Types.ObjectId;


exports.searchByName = function(req,res,next){
	console.log(req.body.searchBy , req.body.searchPara)
	if(req.body.searchPara == undefined){
		User.find({role:'Member'},function(err,docs){
			if (err) throw err;
			let userInfo = setUserInfo(docs);
			res.status(200).json({
      			 user: userInfo
 			 });
			next();
		});
	}
	else{
	if(req.body.searchBy == "searchByBank"){
		User.find({ bankName: { $regex : req.body.searchPara.toUpperCase()},role:'Member'}, function(err,docs){
			if (err) throw err;
			console.log(docs);
			res.status(200).json({
      			 user: docs
 			 });
		});	
		
	}
	else if(req.body.searchBy == "searchByBranch"){
		User.find({ branch: { $regex : req.body.searchPara.toUpperCase()},role:'Member'}, function(err,docs){
			if (err) throw err;
			res.status(200).json({
      			 user: docs
 			 });
			
		});	
	}
	else if(req.body.searchBy=="searchByName"){
		User.find({ firstName: { $regex : req.body.searchPara.toUpperCase()},role:'Member'}, function(err,docs){
			if (err) throw err;
			let userInfo = setUserInfo(docs);
			res.status(200).json({
      			 user: userInfo
 			 });
			console.log(userInfo);
		});	
	}
	else{
		User.find({role:'Member'},function(err,docs){
			if (err) throw err;
			let userInfo = setUserInfo(docs);
			res.status(200).json({
      			 user: userInfo
 			 });
			console.log(userInfo);
		});	
	}
}
}
exports.getUser= function(req,res,next){
	User.findById(ObjectId(req.params.id), function(err,user){
		console.log('hh',user);
		res.status(200).json({
			user:user
		})
	})
	
}

exports.blockUser = function(req,res,next){
	
User.findById(ObjectId(req.params.id), function(err,user){
	    console.log(user);
	    if( user.blocked )
	    	{user.blocked = false}
	    else{user.blocked = true}
	    	console.log(user.blocked);
		user.save(function(err){
			if (err) throw err;
			res.json({
				msg:"success"
			})
		})
	})

}

exports.suspendUser = function(req,res,next){
	
User.findById(ObjectId(req.params.id), function(err,user){
	    console.log("sdcsdc",user);
	    if( user.suspended )
	    	{user.suspended = false}
	    else{user.suspended = true}
		user.save(function(err){
			if (err) throw err;
			res.json({
				msg:"success"
			})
		})
	})

}