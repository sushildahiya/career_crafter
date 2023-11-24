// Import the Employee model
const Employee = require('../model/employee');

// Controller function to render the sign-in page
module.exports.signIn = (req, res) => {
    // Render the login page without using the default layout
    res.render('login', { layout: false });
}

// Controller function to create a session (user login) and redirect to the home page
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

// Controller function to handle user sign-up
module.exports.signUp = async (req, res) => {
    // Create an employee object with user-provided data from the request body
    let employee = {
        name: req.body.name,
        email: req.body.email,
        employee_id: req.body.employee_id,
        contact_no: req.body.contact_no,
        password: req.body.password
    };

    // Check if there are no existing employees, and if so, make the new employee an admin
    const existingEmp = await Employee.find({});
    if (existingEmp.length == 0) {
        employee.is_admin = true;
    }

    // Create a new employee with the provided data
    const newEmp = await Employee.create(employee);

    // Redirect to the home page after successful sign-up
    res.redirect('/');
}

// Controller function to handle user sign-out
module.exports.signOut = function (req, res, done) {
    // Use Passport's logout function to log the user out
    return req.logout((err) => {
        if (err) {
            return done(err);
        }
        // Redirect to the sign-in page after successful logout
        return res.redirect('/user/sign-in');
    });
}
