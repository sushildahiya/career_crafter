// Importing required modules and controllers
const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controller/homeController');

// Route for the home page with authentication check
router.get('/', passport.checkAuthentication, homeController.home);

// Routes for different pages
router.get('/goals', homeController.goals);
router.get('/feedback/:id', homeController.feedback);
router.get('/feedback', homeController.feedback);
router.get('/employees', homeController.employeeList);
router.get('/assign-task', homeController.assignTask);

// Using modular routes for specific functionalities
router.use('/user', require('./user'));
router.use('/employee', require('./employee'));
router.use('/feedback', require('./feedback'));
router.use('/goals', require('./goals'));

// Exporting the router for use in other files
module.exports = router;
