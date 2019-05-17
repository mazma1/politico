import { body } from 'express-validator/check';
import { User } from '../../../models';
import { body, validationResult } from 'express-validator/check';

/**
  * Validates user inputs for signup
  *
  * @param {string} controllerMethod The authentication to be performed (signup|signin)
  * @returns {object} Result of validation
*/
export const validateInput = (controllerMethod) => {
  switch (controllerMethod) {
    case 'signup':
      return [ 
        body('firstname')
          .trim()
          .isLength({ min: 1 }).withMessage('A firstname must be specified')
          .isAlpha().withMessage('Firstname must contain only alphabets'),

        body('lastname')
          .trim()
          .isLength({ min: 1 }).withMessage('A lastname must be specified')
          .isAlpha().withMessage('Lastname must contain only alphabets'),

        body('email', 'Email is already in use')
          .normalizeEmail()
          .isLength({ min: 1 }).withMessage('Email is required')
          .isEmail().withMessage('Please provide a valid email address')
          .custom(async (value) => await User.lookupEmail(value)),

        body('phoneNumber', 'Phone Number must be an 11 digit number')
          .optional().isInt().isLength({ min: 1, max: 11 }),

        body('password')
          .trim()
          .isLength({ min: 1 }).withMessage('Password is required'),
        
        body('confirmPassword', 'Password confirmation does not match password')
          .trim()
          .isLength({ min: 1 }).withMessage('Password confirmation is required')
          .custom((value, { req }) => (value === req.body.password)),
      ]
  
    default:
      break;
  }
};

/**
 * Formats the error messages returend from express validator (if any)
 *
 * @param {object} req Request object from the client
 * @returns {object} Error object foratted as key- value pairs
 */
export const validationHandler = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let parsedErrors = {};
    errors.array({ onlyFirstError: true }).forEach(error => {
      parsedErrors[error.param] = error.msg
    });
    return parsedErrors;
  }
};
