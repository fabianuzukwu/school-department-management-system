const Course = require( '../models/course' );
const Department = require( '../models/department' );

exports.createCourse = async ( req, res ) => {
    try {
        const { departmentId } = req.params;
        const { courseCode, title, creditUnits } = req.body;

        const department = await Department.findById( departmentId );
        if ( !department ) {
            return res.status( 400 ).json( {
                message: 'Course cannot be created because the department does not exist'
            } );
        }

        const data = {
            departmentId,
            courseCode,
            title,
            creditUnits
        };

        const newCourse = new Course( data );

        department.courses.push( newCourse._id );
        newCourse.save();
        department.save();

        res.status( 201 ).json( {
            message: 'Course created successfully',
            data: newCourse
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

exports.getAllCourses = async ( req, res ) => {
    try {
        const Courses = await Course.find().populate( 'departmentId' );

        res.status( 200 ).json( {
            message: `all Courses found and total is ${ Courses.length }`,
            data: Courses
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

exports.getOneCourse = async ( req, res ) => {
    try {
        const { id } = req.params;

        const course = await Course.findById( id ).populate( 'departmentId' );
        if ( !course ) {
            return res.status( 404 ).json( {
                message: 'Course not found'
            } );
        }

        res.status( 200 ).json( {
            message: 'Course found',
            data: course
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

exports.updateCourse = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { courseCode, title, creditUnits } = req.body;
        const course = await Course.findById( id );
        if ( !course ) {
            return res.status( 404 ).json( {
                message: 'Course not found',
            
            } );
        }

        const data = {
           courseCode, title, creditUnits
        };

        const updatedCourse = await Course.findByIdAndUpdate( id, data, { new: true } );
        res.status( 200 ).json( {
            message: 'Course updated successfully',
            data: updatedCourse
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

exports.deleteCourse = async ( req, res ) => {
    try {
        const { id } = req.params;
        const course = await Course.findById( id );

        if ( !course ) {
            return res.status( 404 ).json( {
                message: 'Course not found'
            } );
        }

        await Course.findByIdAndDelete( id );
        res.status( 200 ).json( {
            message: 'Course deleted successfully'
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};