const router = require('express').Router()
const { createCourse, getAllCourses, getOneCourse, updateCourse, deleteCourse } = require('../controllers/course')
const { createCourseValidator, updateCourseValidator } = require('../middlewares/courseValidator')

router.post('/courses/:departmentId',createCourseValidator, createCourse)
router.get('/courses', getAllCourses)
router.get('/courses/:id', getOneCourse)
router.patch('/courses/:id', updateCourseValidator, updateCourse)
router.delete('/courses/:id', deleteCourse)

module.exports = router