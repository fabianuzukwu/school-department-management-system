const Department = require('../models/department')

exports.createDepartment = async (req, res) => {
    try {
       const {name, faculty } = req.body

       const department = await Department.findOne({name: name.toLowerCase()})
       if (department) {
            return res.status(400).json({
                message: 'department already exist'
            })
       }
       const data ={
          name: name.toLowerCase(),
          faculty
       }

       const newDepartment = new Department(data)

       newDepartment.save()

       res.status(201).json({
        message: 'Department created successfully',
        data: newDepartment
       })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('courses')

        res.status(200).json({
            message: `all departments found and total is ${departments.length}`,
            data: departments
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneDpartment = async (req, res) => {
    try {
        const { id } = req.params

        const department = await Department.findById(id).populate('courses')
        if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            })
        }

        res.status(200).json({
            message: 'Department found',
            data: department
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const { name, faculty } = req.body
        const department = await Department.findById(id)
        if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            })
        }

         
        const data = {
            name,
            faculty
        }

        if (name && name !== department.name) {
            const existingDepartment = await Department.findOne({name: name.toLowerCase()})
            if (existingDepartment) {
                return res.status(400).json({
                    message: 'Name already exist'
                })
            }
        }


        const updatedDepartment = await Department.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json({
            message: 'Department updated successfully',
            data: updatedDepartment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const department = await Department.findById(id)

          if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            })
        }

        await Department.findByIdAndDelete(id)
        res.status(200).json({
            message: 'Department deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}