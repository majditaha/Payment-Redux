exports.setUserInfo = function setUserInfo(request) {
	var getUserInfo = [];
	request.forEach(function(req){
		var getUser = {
    _id: req._id,
    firstName: req.firstName,    
    contact: req.contact,
    bankName: req.bankName,
    accountNumber:req.accountNumber,
    branch: req.branch,
    bankBranch:req.bankBranch,
    suspended: req.suspended,
    blocked:req.blocked
  };
  getUserInfo.push(getUser);
	});
  
  return getUserInfo;
};