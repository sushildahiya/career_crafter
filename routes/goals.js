// Import the Express module and create a router
const express = require('express');
const router = express.Router();

// Import the goalsController module for handling goals-related routes
const goalsController = require('../controller/goalsController');

// Route to handle unlocking goals for a specific employee
router.post('/unlock-goal/:id', goalsController.unlockGoals);

// Route to handle submitting goals for the current user
router.post('/submit-goals', goalsController.submitGoals);

// Route to handle submitting self-assessment for the current user
router.post('/submit-assessment', goalsController.submitSelfAssessment);

// Route to handle adding a goal for the current user
router.post('/add-goal', goalsController.addGoal);

// Route to handle deleting performance review data for a specific employee
router.post('/delete/:id', goalsController.deletePerformanceReview);

// Export the router to be used in other parts of the application
module.exports = router;
