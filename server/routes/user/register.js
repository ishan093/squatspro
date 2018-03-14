const router = require('express').Router();
const passport = require('passport');
const User = require('../../models/User');

router.post('/', passport.authenticate('local-signup'), (req, res) => {
    res.json(req.user);
});


router.get('/:username', (req, res) => {
    req.params.username = req.params.username.toLowerCase();
  
   User.findOne({'username': req.params.username}, (err, user) => {
        if (err) {
            return res.status(500).json({error: true});
        }
   
        return res.json({alreadyInUse: user ? true : false});
    });
});
module.exports = router;