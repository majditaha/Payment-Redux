const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

const Acc_schema = new Schema({
	acc_type:{
		type:String,
		default:'A'
	},
	acc_amt:{
		type:Number,
		default:10000
	}
});

module.exports = mongoose.model('Account_type',Acc_schema);