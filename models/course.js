const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    departmentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Departments',
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    creditUnits: {
        type: Number,
        required: true
    },
})

const Course = mongoose.model('Courses', courseSchema)

module.exports = Course