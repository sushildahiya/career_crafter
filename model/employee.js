// Import required modules for schema definition and file handling
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs')
const path = require('path');

// Define the path for storing user avatars
const AVATAR_PATH = path.join('/uploads/users/avatars');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
    // Basic employee information
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    employee_id: {
        type: Number,
        required: true
    },
    contact_no: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // Admin-related fields
    is_admin: {
        type: Boolean,
        default: false
    },
    is_admin_req: {
        type: Boolean,
        default: false
    },
    // Avatar path
    avatar: {
        type: String,
        default: null
    },
    // Performance-related fields
    performance: {
        goal_setting_unlocked: {
            type: Boolean,
            default: false
        },
        last_date: {
            type: String,
            default: null
        },
        is_goal_submitted: {
            type: Boolean,
            default: false
        },
        is_self_assessment_submitted: {
            type: Boolean,
            default: false
        },
        feedback_given: {
            type: Boolean,
            default: false
        },
        // Goals array
        goals: [
            {
                goal: {
                    type: String,
                },
                weightage: Number,
                target: Number,
                description: String,
                rating: Number
            }
        ],
        comment: String,
        reviews: []
    },
    // Assigned and completed reviews arrays
    assigned_reviews: [],
    completed_reviews: [],
    // Review assignment status
    is_review_assigned: {
        type: Boolean,
        default: false
    }
});

// Multer storage configuration for avatar uploads
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(!fs.existsSync(path.join(__dirname, '..', AVATAR_PATH))){
            fs.mkdirSync(path.join(__dirname, '..', AVATAR_PATH), { recursive: true })
        }
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// Static function to handle avatar uploads using Multer
employeeSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');

// Static property to define the avatar path
employeeSchema.statics.avatarPath = AVATAR_PATH;

// Create the Employee model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

// Export the Employee model
module.exports = Employee;
