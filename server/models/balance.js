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
      		type:Number,default:0
      	},
            status:{
                  type:Boolean
            }
      });
      module.exports = mongoose.model('Balance',UserSchema);