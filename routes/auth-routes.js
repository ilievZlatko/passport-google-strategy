const router = require('express').Router();
const passport = require('passport');

// Auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// Auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// Auth with google
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
);

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached the callback URI');
});

module.exports = router;
