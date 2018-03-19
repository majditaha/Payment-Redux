const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

      const UserSchema = new Schema({
      	user_id:{ type: String
            },
      	date:{
      		type:Date,
      		default:Date.now
      	},
      	amount:{
      		type:Number
      	},
            RefDoNo :{
                  type: Number
            },
            withdrawnBy:{
                  type : String,default:'self'
            },
      	status:{
      		type:Boolean,
                  default:false
      	}
      });
      module.exports = mongoose.model('Withdrawal',UserSchema);