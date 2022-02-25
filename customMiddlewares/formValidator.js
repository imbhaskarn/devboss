const {
    body
} = require('express-validator')

module.exports = {
    Registration: [
        body('fname').isLength({
            min: 3
        }).withMessage('First name must be at least 3 chars long!'),
        body('lname').isLength({
            min: 3
        }).withMessage('First name must be at least 3 chars long!'),
        body('email').isEmail().withMessage('Email is not a valid email!'),
        body('username').isLength({
            min: 3
        }).withMessage('username must be at least 3 chars long!').isString().withMessage('Use chars only!'), body('password').isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1
        }).withMessage('Password must contain one A-Z, one a-z, one number and must be 6  chars at least!')
    ],
    login: [
        body('email').isEmail().withMessage('Email is not a valid email!'),
        body('username').isLength({
            min: 3
        }).withMessage('username must be at least 3 chars long!').isString().withMessage('Use chars only!'),
    ]
}