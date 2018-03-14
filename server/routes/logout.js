const router = require('express').Router();
const passport = require('passport');
const isauth = require('../Auth/index');

router.get('/',isauth.isAuthenticated,(request, response) => {
    request.session.destroy(function(req,res,err){
       if(err){
           response.status(500).json({status:false,error:err})
       }
       else
       {
         response.status(200).json({success: true});
       }
 
    })
 });

module.exports = router;