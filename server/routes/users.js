const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');



router.get('/', (req, res) => {
  
    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).json({error: true});
        }
   
        return res.json(users);
    });
});
module.exports = router;