const express = require('express');
const router = express.Router();
const passport = require('passport');

// @desc  Auth with google
// @route GET /google
router.get('/',
    passport.authenticate('google', { scope: ['profile']}));

// @desc  Google Auth Callback
// @route GET /auth/google
router.get('/callback',
    passport.authenticate('google', {
        successRedirect:'/',
        failureRedirect: '/'}),
(req, res) => {
    res.send(`Welcome!!`);
});

// @desc   Logout user
// @route  GET /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err){
            return next(err);
        }
        res.redirect('/');
    });
});


module.exports = router;