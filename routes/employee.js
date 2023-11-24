// Import the Express module and create a router
const express = require('express');
const router = express.Router();

// Import the employeeController module for handling employee-related routes
const employeeController = require('../controller/employeeController');

// Route to handle updating the profile image for a specific employee
router.post('/update-profile-img/:id', employeeController.updateAvatar);

// Route to render the settings page for the current user
router.get('/settings', employeeController.settings);

// Route to handle the request for admin status by the current user
router.post('/requestAdmin', employeeController.requestAdmin);

// Route to handle accepting admin request for a specific employee
router.post('/acceptAdmin/:id', employeeController.acceptAdminReq);

// Route to handle rejecting admin request for a specific employee
router.post('/rejectAdmin/:id', employeeController.rejectAdminReq);

// Export the router to be used in other parts of the application
module.exports = router;
