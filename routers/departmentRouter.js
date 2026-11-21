const router = require('express').Router()
const { createDepartment, getAllDepartments, getOneDpartment, updateDepartment, deleteDepartment } = require('../controllers/department');
const { updateDepartmentValidator, createDepartmentValidator } = require('../middlewares/departmentValidator')

router.post('/departments',createDepartmentValidator, createDepartment)
router.get('/departments', getAllDepartments)
router.get('/departments/:id', getOneDpartment)
router.patch('/departments/:id', updateDepartmentValidator, updateDepartment)
router.delete('/departments/:id', deleteDepartment)

module.exports = router