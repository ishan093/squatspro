const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local-login'), (req, res) => {
    res.json(req.user);
});

module.exports = router;