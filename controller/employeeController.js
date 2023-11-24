const Employee = require("../model/employee");
const fs = require('fs');
const path = require('path');

// Function to handle the update of the user's avatar
module.exports.updateAvatar = async (req, res) => {
    // Check if the logged-in user matches the requested user
    if (req.user._id == req.params.id) {
        try {
            // Use the Employee model to upload the avatar using Multer middleware
            Employee.uploadAvatar(req, res, function (err) {
                if (err) {
                    // Handle Multer errors
                    console.log("Multer error: ", err);
                    return res.status(500).send("Error uploading avatar");
                }

                // Check if a file was successfully uploaded
                if (req.file) {
                    // Update the user's avatar path and save to the database
                    req.user.avatar = path.join(Employee.avatarPath, req.file.filename);
                    req.user.save();
                    return res.redirect('/');
                } else {
                    // If no file is provided, return a 400 status
                    return res.status(400).send("No file provided");
                }
            });
        } catch (err) {
            // Handle other errors
            console.error(err);
            return res.status(500).send("Internal server error");
        }
    } else {
        // If the user is not authorized, return a 403 status
        return res.status(403).send("Unauthorized");
    }
};

// Render the profile image settings page
module.exports.settings = (req, res) => {
    return res.render('profile_image', {
        layout: false,
        user: { id: req.user.id },
        avatar: req.user.avatar,
        employee_id: req.user.employee_id,
        name: req.user.name
    });
}

// Request admin status for the logged-in user
module.exports.requestAdmin = async (req, res) => {
    let employee = await Employee.findByIdAndUpdate(req.user.id, { is_admin_req: true });
    employee.save();
    res.redirect('back');
}

// Accept admin request for a specific user
module.exports.acceptAdminReq = async (req, res) => {
    let employee = await Employee.findByIdAndUpdate(req.params.id, { is_admin: true, is_admin_req: false });
    employee.save();
    res.redirect('back');
}

// Reject admin request for a specific user
module.exports.rejectAdminReq = async (req, res) => {
    let employee = await Employee.findByIdAndUpdate(req.params.id, { is_admin: false, is_admin_req: false });
    employee.save();
    res.redirect('back');
}
