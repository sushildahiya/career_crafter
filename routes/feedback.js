// Import the Express module and create a router
const express = require('express');
const router = express.Router();

// Import the feedbackController module for handling feedback-related routes
const feedbackController = require('../controller/feedbackController');

// Route to handle assigning feedback for a specific employee
router.post('/assign-task', feedbackController.feedbackAssign);

// Route to handle submitting feedback for a specific employee
router.post('/submit-feedback/:id', feedbackController.submitFeedback);

// Export the router to be used in other parts of the application
module.exports = router;
