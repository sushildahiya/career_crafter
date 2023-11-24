// Import the Employee model
const Employee = require("../model/employee");

// Controller function for rendering the home page
module.exports.home = async (req, res) => {
    // Check if the user has an avatar, if not, render the profile image page
    if (req.user.avatar === null || req.user.avatar === '') {
        return res.render('profile_image', {
            user: {
                id: req.user.id,
            },
            avatar: req.user.avatar,
            employee_id: req.user.employee_id,
            name: req.user.name,
            contact_no: req.user.contact_no,
            email: req.user.email,
            layout: false
        });
    }

    // Calculate completed and pending review counts for the user
    const assignedReviews = req.user;
    let completedReviewsCount = 0,
        pendingReviewsCount = 0;
    
    for (let i = 0; i < assignedReviews.assigned_reviews.length; i++) {
       pendingReviewsCount++
    }
    for (let i = 0; i < assignedReviews.completed_reviews.length; i++) {
        completedReviewsCount++
     }

    // Calculate various counts related to admin and task assignments for all employees
    const is_admin = req.user.is_admin;
    let adminCount = 0;
    let totalEmployees = 0;
    let adminReqCount = 0;
    let taskAssignPending = 0;
    
    const employees = await Employee.find({});
    totalEmployees = employees.length;

    for (let i = 0; i < totalEmployees; i++) {
        if (employees[i].is_admin) {
            adminCount++;
        }
        if (employees[i].is_admin_req) {
            adminReqCount++;
        }
        if (!employees[i].is_review_assigned && !employees[i].performance.feedback_given) {
            taskAssignPending++;
        }
    }

    // Render the dashboard with the calculated counts and employee data
    return res.render('dashboard', {
        user: req.user,
        currentPage: 'dashboard',
        completedReviewsCount,
        pendingReviewsCount,
        adminCount,
        totalEmployees,
        employees,
        adminReqCount,
        taskAssignPending
    });
}

// Controller function for rendering the goals page
module.exports.goals = (req, res) => {
    return res.render('goals', { currentPage: 'goals' });
}

// Controller function for rendering the feedback page
module.exports.feedback = async (req, res) => {
    let id;
    let employee = null;

    // If a specific employee ID is provided in the request params, find that employee
    if (req.params.id) {
        id = req.params.id;
        employee = await Employee.findById(id);
    } else {
        id = null;
    }

    // Render the feedback page with user information and the found employee
    res.render('feedback', { currentPage: 'feedback', id, user: req.user, employee: employee });
}

// Controller function for rendering the employees page
module.exports.employeeList = async (req, res) => {
    // Find all employees and render the employees page with the employee data
    let employees = await Employee.find({});
    return res.render('employees', { currentPage: 'employees', employees });
}

// Controller function for rendering the assign-task page
module.exports.assignTask = async (req, res) => {
    // Find all employees and render the assign-task page with the employee data
    let employees = await Employee.find({});
    return res.render('assign-task', { currentPage: 'assign-task', employees });
}
