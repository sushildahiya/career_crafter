// Import the Employee model
const Employee = require('../model/employee');

// Controller function for assigning feedback
module.exports.feedbackAssign = async (req, res) => {
    // Find the employee with the specified ID in the request body
    const employee = await Employee.findById(req.body.receiver);

    // Find the sender employee with the specified ID in the request body
    const senderEmployee = await Employee.findById(req.body.sender);

    // Create an object containing sender employee information
    const senderEmp = {
        id: req.body.sender,
        ...senderEmployee
    };

    // Add the sender employee information to the assigned_reviews of the receiver employee
    employee.assigned_reviews.push(senderEmp);

    // Save the changes to the receiver employee
    employee.save();

    // Redirect back to the previous page
    res.redirect('back');
};

// Controller function for submitting feedback
module.exports.submitFeedback = async (req, res) => {
    try {
        // Find the employee with the specified ID in the request parameters
        let employee = await Employee.findById(req.params.id);

        // Update the ratings for each goal based on the submitted form data
        for (let i = 0; i < employee.performance.goals.length; i++) {
            employee.performance.goals[i].rating = req.body[`rating_${i}`];
        }

        // Set the comment and mark feedback as given
        employee.performance.comment = req.body.comment;
        employee.performance.feedback_given = true;

        // Find the employee who submitted the feedback
        const employeeUnreviewed = await Employee.findById(req.user.id);

        // Move the completed review to the completed_reviews array
        for (let i = 0; i < employeeUnreviewed.assigned_reviews.length; i++) {
            if (employeeUnreviewed.assigned_reviews[i].id == req.params.id) {
                employeeUnreviewed.completed_reviews.push(employeeUnreviewed.assigned_reviews[i]);
            }
        }

        // Filter out the reviewed employee from assigned_reviews
        const newAssigned = employeeUnreviewed.assigned_reviews.filter(
            (item) => item.id !== req.params.id
        );
        employeeUnreviewed.assigned_reviews = newAssigned;

        // Save changes for both the reviewed and reviewing employees
        await employee.save();
        await employeeUnreviewed.save();

        // Redirect to the home page
        res.redirect('/');
    } catch (error) {
        // Handle errors and send a 500 Internal Server Error status
        console.error("Error in submitFeedback:", error);
        res.status(500).send("Internal Server Error");
    }
};
