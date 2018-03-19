const mongoose = require('mongoose'),  
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

      //================================
// User Schema
//================================
const UserSchema = new Schema({  
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { 
    type: String 
  },
  role: {
    type: String,
    enum: ['Member','Admin','Teller'],
    default: 'Member'
  },
  contact: {
    type: String   
  },
  branch: {
    type: String
  },
  accountType: {
    type: String,
    default:'A'
  },
  bankName :{
    type: String
  },
  bankBranch :{
    type: String
  },
  accountNumber: {
    type: String
  },
  suspended:{
  type:Boolean,
  default:false
  },
  blocked:{
  type:Boolean,
  default:false
  },
suspended_date:{
  type:Date
},
unsuspended_date:{
  type:Date
},
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},

{
  timestamps: true
});


// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {  
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {  
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}


module.exports = mongoose.model('User', UserSchema);  