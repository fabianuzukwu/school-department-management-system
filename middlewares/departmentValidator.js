const Joi = require( 'joi' );

const createDepartmentValidator = ( req, res, next ) => {
    const departmentSchema = Joi.object( {
        name: Joi.string().trim().regex( /^(?=(?:.*[A-Za-z]){3})[A-Za-z' -]+$/ ).required().messages( {
            'any.required': 'Name is required.',
            'string.empty': 'Name cannot be empty.',
            'string.pattern.base': 'Name can only contain letters with space in between (optional), and must be at least 3 letters long.'
        } ),
        faculty: Joi.string().trim().regex( /^(?=(?:.*[A-Za-z]){3})[A-Za-z' -]+$/ ).required().messages( {
            'any.required': 'Faculty is required.',
            'string.empty': 'Faculty cannot be empty.',
            'string.pattern.base': 'Faculty can only contain letters with space in between (optional), and must be at least 3 letters long.'
        } )
    } );

    const { error } = departmentSchema.validate( req.body );

    if ( error ) {
        return res.status( 400 ).json( {
            message: error.details[ 0 ].message
        } );
    }

    next();
};

const updateDepartmentValidator = ( req, res, next ) => {
    const departmentSchema = Joi.object( {
        name: Joi.string().trim().regex( /^(?=(?:.*[A-Za-z]){3})[A-Za-z' -]+$/ ).optional().messages( {
            'string.empty': 'Name cannot be empty.',
            'string.pattern.base': 'Name can only contain letters with space in between (optional), and must be at least 3 letters long.'
        } ),
        faculty: Joi.string().trim().regex( /^(?=(?:.*[A-Za-z]){3})[A-Za-z' -]+$/ ).optional().messages( {
            'string.empty': 'Faculty cannot be empty.',
            'string.pattern.base': 'Faculty can only contain letters with space in between (optional), and must be at least 3 letters long.'
        } )
    } );

    const { error } = departmentSchema.validate( req.body );

    if ( error ) {
        return res.status( 400 ).json( {
            message: error.details[ 0 ].message
        } );
    }

    next();
};


module.exports = {
    createDepartmentValidator,
    updateDepartmentValidator
}
