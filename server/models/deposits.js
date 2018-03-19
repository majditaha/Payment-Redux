const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

      const UserSchema = new Schema({
      	user_id:{ type: String,
      		ref:'User'},
      	date:{
      		type:Date,
      		default:Date.now
      	},
      	amount:{
      		type:Number,
                  default:0
      	},
            message:{
                  type:String,
            },
            depositBy:{
                  type:String,
                  default:'auto'
            },
            status:{
                  type:Boolean
            }
      });
      module.exports = mongoose.model('Deposit',UserSchema);