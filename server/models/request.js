const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

      const UserSchema = new Schema({
      	user_id:{ type: String,
      		ref:'User'},
            name:{
                  type:String
            },
      	date:{
      		type:Date,
      		default:Date.now
      	},
      	amount:{
      		type:Number
      	},
      	message:{
      		type:String
      	},
            status:{
                  type:Boolean,
                  default:false
            }
      });
      module.exports = mongoose.model('Request',UserSchema);