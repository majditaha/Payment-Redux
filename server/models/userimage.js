const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

      const UserImageSchema = new Schema({
      	user_id:{ type: String
            },
      	date:{
      		type:Date,
      		default:Date.now
      	},
      	filename:{
      		type: String
      	},
      	
      });
      module.exports = mongoose.model('Userimage',UserImageSchema);