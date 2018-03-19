const User = require('../models/user'),
      config = require('../config/main');
      const setUserInfo = require('../helpers').setUserInfo;
      var ObjectId = require('mongoose').Types.ObjectId;
 const Request  = require('../models/request');
const Account = require('../models/account_type');

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
      }
exports.amountCalc = function(req,res,next){
      let id = req.params.id;
      User.findById(ObjectId(id),function(err,user){
            if (err) throw err;
            if (user)
            Account.findOne({acc_type : user.accountType},function(err,acc){
                  if (err) throw err;                  
                  if (acc){
                        var d = new Date();
            var totdays = daysInMonth(d.getMonth(),d.getFullYear());
      var n = d.getDate();
      var a = (n * (acc.acc_amt/parseFloat(totdays + 1))).toFixed(2) ;
            res.json({a:a});
                  }

            })
      })
      	
      };

exports.totalamt = function(req,res,next){
      	var d = new Date();
	var n = d.getMonth();	
	var a = (n % 3) * 10000;
	function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
	}
	daysInMonth(2,2009);	
	var totdays = daysInMonth(d.getMonth(),d.getFullYear());
	var n = d.getDate();
	var totalamt = (n * (10000/parseFloat(totdays + 1))).toFixed(2) ;
	res.json({totalamt:totalamt});
      }

 exports.sendWRequest = function(req,res,next){
      	const amt = req.body.amount,
      			textMes = req.body.textMes,
      			name = req.body.name,
      			user_id = req.body.user_id;
      

      let request = new Request({
      	name : name,
      	user_id : user_id,
      	message : textMes,
      	amount: amt
      });

      request.save(function(err,req){
      	if(err) throw err;
      	res.json({
      		msg:"success"
      	})
      })

//console.log(req.user)
}