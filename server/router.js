const AuthenticationController = require('./controllers/authentication'),  
      SearchUser = require('./controllers/searchuser'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport'),
      amountCalc = require('./controllers/amountCalc'),
      adminControl = require('./controllers/adminControl');
      Userimage = require('./models/userimage');
      var test = require('./controllers/test')

      // Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false }); 
const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;
const ROLE_TELLER = require('./constants').ROLE_TELLER;
// Constants for role types
const REQUIRE_ADMIN = "Admin",  
      REQUIRE_OWNER = "Owner",
      REQUIRE_TELLER = "Teller",
      REQUIRE_MEMBER = "Member";

      module.exports = function(app) {  
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Test protected route
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });

  authRoutes.post('/searchuser', SearchUser.searchByName);

  authRoutes.use('/user' , userRoutes);

  userRoutes.get('/:id',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),SearchUser.getUser);
  authRoutes.get('/amtcalc/:id', amountCalc.amountCalc); //amount deposited to user
  authRoutes.get('/totalamt/:id' , amountCalc.totalamt);// total amount on widrawal
  authRoutes.post('/sendWRequest', amountCalc.sendWRequest); // sending withdrawal requet to the user
  authRoutes.get('/viewRequest',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.viewRequest);// admin view the request
  authRoutes.post('/confirm',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.doneRequest);//admin confirm the request
  authRoutes.get('/withdraw/:id',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.viewWithdraw);
  authRoutes.post('/withdrawUser/:id',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.withdrawUser);
  authRoutes.post('/depositUser/:id',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.depositUser);
  authRoutes.get('/check_balance/:id',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.checkBalance);
  authRoutes.get('/reportByBank',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), adminControl.reportByBank);
  authRoutes.get('/reportByBranch',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), adminControl.reportByBranch);
  authRoutes.post('/acctype',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.addAcount);
  authRoutes.get('/acctype',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.getAccountType);
  authRoutes.get('/acctype/:id',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.deleteAccountType);
  authRoutes.put('/acctype/:id',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),adminControl.updateAccountType);
  authRoutes.get('/reportByDeposit',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), adminControl.reportByDeposit);  
  authRoutes.get('/reportBySuspend',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), adminControl.reportBySuspend);  
  authRoutes.get('/reportByWithdraw',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), adminControl.reportByWithdraw);
  authRoutes.put('/editprofile/:id',requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN),AuthenticationController.updateUser);
  authRoutes.post('/blockuser/:id',SearchUser.blockUser);
  authRoutes.post('/suspenduser/:id',SearchUser.suspendUser);
  authRoutes.get('/depositmanual', test.depositmanual);
  
 const User   = require('./models/user'),
      config = require('./config/main'),
      multiparty = require('multiparty'),
      path = require('path'),
      crypto = require('crypto');

  var multer = require('multer');
  //var _id = '1234';
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {

    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, file.originalname ) /*+ path.extname(file.originalname))*/
    })
  }
})


var fs = require('fs');
var upload = multer({ storage: storage })
  authRoutes.post('/upload/:id',upload.single('photo'),function(req,res,next){
   console.log(req.file);
   //fs.rename('./uploads/Chrysanthemum.jpg', './uploads/AF.jpg', function(err) {

   const user_id = req.params.id,
        filename = req.file.originalname,
        imagename = filename.replace(filename.split(".")[0],  user_id );

  let image = new Userimage({
        user_id : user_id,
        filename : imagename
      });
      image.save(function(err,data){
        res.json({ mes:'success'});
      })

     if (fs.existsSync('./uploads/' + imagename )) {
        fs.unlink('./uploads/' + imagename , function (err) {
            if (err) throw err;
            console.log('Deletion sucessful.');
          });
      } 
    fs.rename('./uploads/' + filename , './uploads/' + imagename , function(err) {
    if ( err ) console.log('ERROR: ' + err);
});
  });
// Set url for API group routes
  app.use('/api', apiRoutes);
};