const Joi = require('joi')

const createCourseValidator = ( req, res, next ) => {
    const courseSchema = Joi.object( {
        courseCode: Joi.string().trim().regex(/^[A-Z]{3} \d{3}$/).required().messages( {
            'any.required': 'Course Code is required.',
            'string.empty': 'Course Code cannot be empty.',
            'string.pattern.base': 'Course code must have 3 letters in Upper Case, a single space, and 3 digits (e.g CSC 101).'
        } ),
        title: Joi.string().trim().regex(/^(?=(?:.*[A-Za-z]){3})[A-Za-z' -]+$/).required().messages( {
            'any.required': 'Title is required.',
            'string.empty': 'Title cannot be empty.',
            'string.pattern.base': 'Title can only contain letters with space in between (optional), and must be at least 3 letters long.'
        } ),
        creditUnits: Joi.number().min( 1 ).max( 4 ).required().messages( {
            'any.required': 'Credit unit is required.',
            'number.min': 'Credit unit must be at least 1.',
            'number.max': 'Credit unit cannot exceed 4.',
        } )
    } );

    const {error} = courseSchema.validate(req.body)
     if ( error ) {
        return res.status( 400 ).json( {
            message: error.details[ 0 ].message
        } );
    }

    next();
};

const updateCourseValidator = ( req, res, next ) => {
     const courseSchema = Joi.object( {
        courseCode: Joi.string().trim().regex(/^[A-Z]{3} \d{3}$/).optional().messages( {
            'string.empty': 'Course Code cannot be empty.',
            'string.pattern.base': 'Course code must have 3 letters in Upper Case, a single space, and 3 digits (e.g CSC 101).'
        } ),
        title: Joi.string().trim().regex(/^(?=(?:.*[A-Za-z]){3})[A-Za-z' -]+$/).optional().messages( {
            'string.empty': 'Title cannot be empty.',
            'string.pattern.base': 'Title can only contain letters with space in between (optional), and must be at least 3 letters long.'
        } ),
        creditUnits: Joi.number().min( 1 ).max( 4 ).optional().messages( {
            'number.min': 'Credit unit must be at least 1.',
            'number.max': 'Credit unit cannot exceed 4.',
        } )
    } );

    const {error} = courseSchema.validate(req.body)
     if ( error ) {
        return res.status( 400 ).json( {
            message: error.details[ 0 ].message
        } );
    }

    next();
};

module.exports = {
    createCourseValidator,
    updateCourseValidator
}