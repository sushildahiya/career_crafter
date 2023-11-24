// Importing required modules and controllers
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const passport = require('passport');

// Route to render the sign-in page
router.get('/sign-in', userController.signIn);

// Route to create a session (user login) using local authentication strategy
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/sign-in'
}), userController.createSession);

// Route to handle user sign-up
router.post('/sign-up', userController.signUp);

// Route to handle user sign-out
router.get('/sign-out', userController.signOut);

// Exporting the router for use in other files
module.exports = router;
