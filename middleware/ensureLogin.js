
//to verify login
var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
  };
  //to protecting from login bypass
  var ensureAuth = function(req, res, next){
    if(!req.isAuthenticated()) {
      return next();
    }else {
      res.redirect("/dashboard");
    }
  };

  var ensureAdmin = function(req, res, next){
    if(req.isAuthenticated()){
      console.log(req.user.userstatus==="admin");
      if(req.user.userstatus === "admin"){
        return next();
      }else{
        res.redirect('/')
      }
      
    }
  }


  module.exports = { loggedin, ensureAuth, ensureAdmin}