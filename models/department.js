const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    faculty: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Courses'
    }]
})

const Department =  mongoose.model('Departments', departmentSchema)

module.exports = Department