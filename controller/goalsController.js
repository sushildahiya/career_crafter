// Import Express and the Employee model
const e = require('express');
const Employee = require('../model/employee')

// Controller function to add a goal for an employee
module.exports.addGoal = async (req, res) => {
    // Find the employee with the ID of the logged-in user
    let employee = await Employee.findById(req.user.id);

    // Add the new goal to the employee's performance goals array and save
    employee.performance.goals.push(req.body);
    employee.save();

    // Redirect back to the previous page
    res.redirect('back');
}

// Controller function to unlock goals for a specific employee
module.exports.unlockGoals = async (req, res) => {
    // Find the employee by ID and update goal-related properties
    let employee = await Employee.findByIdAndUpdate(req.params.id, {
        $set: {
            'performance.goal_setting_unlocked': true,
            'performance.last_date': req.body.date
        }
    });
    
    // Save the changes
    employee.save();

    // Redirect back to the previous page
    res.redirect('back');
}

// Controller function to submit goals for the logged-in user
module.exports.submitGoals = async (req, res) => {
    // Find the employee by ID and update the goal submission status
    let employee = await Employee.findByIdAndUpdate(req.user.id, {
        $set: {
            'performance.is_goal_submitted': true
        }
    });

    // Save the changes
    employee.save();

    // Redirect back to the previous page
    res.redirect('back');
}

// Controller function to submit self-assessment for the logged-in user
module.exports.submitSelfAssessment = async (req, res) => {
    // Find the employee by ID
    var employee = await Employee.findById(req.user.id)

    // Determine the number of goals
    const numOfGoals = req.user.performance.goals.length
    
    // Loop through goals and add reviews to the employee's performance reviews array
    for (let i = 0; i < numOfGoals; i++) {
        employee.performance.reviews.push(req.body[`assigne_review${i}`]);
    }

    // Save the changes
    employee.save();

    // Find the employee by ID and update self-assessment submission status
    var employee = await Employee.findByIdAndUpdate(req.user.id, {
        $set: {
            'performance.is_self_assessment_submitted': true
        }
    });

    // Save the changes
    employee.save();

    // Redirect back to the previous page
    res.redirect('back');
}

// Controller function to delete performance review-related data for a specific employee
module.exports.deletePerformanceReview = async (req, res) => {
    // Find the employee by ID
    const employee = await Employee.findById(req.params.id)

    // Reset various performance-related properties
    employee.performance.is_goal_submitted = false
    employee.performance.is_self_assessment_submitted = false
    employee.performance.feedback_given = false
    employee.performance.goals = []
    employee.performance.reviews = []

    // Save the changes
    employee.save();

    // Redirect back to the previous page
    res.redirect('back');
}
