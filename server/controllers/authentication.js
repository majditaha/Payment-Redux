const jwt = require('jsonwebtoken'),  
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('../config/main'),
      ObjectId = require('mongoose').Types.ObjectId;

      function generateToken(user) {  
       return jwt.sign(user, config.secret, {
          expiresIn: 10080 // in seconds
        });
      }

// Set user info from request
function setUserInfo(request) {  
  return {
    _id: request._id,
    firstName: request.firstName,
   // lastName: request.profile.lastName,
    email: request.email,
    role: request.role,
    contact: request.contact,
    branch: request.branch,
    accountType: request.accountType,
    bankName: request.bankName,
    bankBranch: request.bankBranch,
    accountNumber: request.accountNumber,
    suspended: request.suspended,
    blocked: request.blocked,
    suspended_date: request.suspended_date,
    unsuspended_date: request.unsuspended_date
  };
}
  //========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

  let userInfo = setUserInfo(req.user);
  /*  if(req.user.suspended === true || req.user.blocked === true){
      res.status(422).send({ error: "Your login details could not be verified. Please try again." })
      return;
    } */
  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });

}


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {  
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName.toUpperCase();  
  const password = req.body.password;
  const confpassword = req.body.confpassword;
  const role = req.body.role;
  const contact = req.body.contact;
  const branch = req.body.branch.toUpperCase();
  const accountType = req.body.accountType;
  const bankName = req.body.bankName.toUpperCase();
  const bankBranch = req.body.bankBranch;
  const accountNumber = req.body.accountNumber;
  const suspended = req.body.suspended;
  const blocked = req.body.blocked;
  var suspended_date,unsuspended_date;
  //console.log()
  if(suspended == "true") 
    {
       suspended_date = new Date();
    }
    else
    {
       unsuspended_date =  new Date();
       suspended_date: null;
    }

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }
 /* if(confpassword != password){
    return res.status(422).send({ error: 'Confirm password does not match password.'});
  }
*/
  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        firstName: firstName ,
        role: role,
        branch: branch,
        contact : contact,
        accountType: accountType,
        bankName: bankName,
        bankBranch: bankBranch,
        accountNumber: accountNumber,
        suspended: suspended,
        blocked: blocked
        
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

        let userInfo = setUserInfo(user);

        res.status(200).json({
          //token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}

//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {  
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role || foundUser.role == 'Teller') {
        console.log('role authorization');
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}

exports.updateUser= function(req,res,next){
  User.findById(ObjectId(req.params.id),function(err,updateUser){
    if (err) throw err;
    console.log(req.body.firstName);
    if (typeof req.body.email !== 'undefined')
      updateUser.email            = req.body.email;   
     if (typeof req.body.firstName !== 'undefined')
      updateUser.firstName        = req.body.firstName.toUpperCase();
    if (typeof req.body.branch !== 'undefined')
      updateUser.branch           = req.body.branch.toUpperCase();
    if (typeof req.body.accountType !== 'undefined')    
      updateUser.accountType      = req.body.accountType;
     if (typeof req.body.bankName !== 'undefined')
      updateUser.bankName         = req.body.bankName.toUpperCase();
    if (typeof req.body.bankBranch !== 'undefined')
      updateUser.bankBranch       = req.body.bankBranch;
    if (typeof req.body.accountNumber !== 'undefined')    
      updateUser.accountNumber    = req.body.accountNumber;
         if (typeof req.body.contact !== 'undefined')    
      updateUser.contact    = req.body.contact;   
      updateUser.save(function(err){
      if (err) throw err;
      res.json({
        msg:"success"
      })
    })
  })

}

