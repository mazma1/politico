/* eslint newline-per-chained-call: off */

import { body, validationResult } from 'express-validator/check';
import { User } from '../../../models';

/**
  * Validates user inputs for signup and login
  *
  * @param {string} controllerMethod Authentication to be performed (signup|signin)
  * @returns {object} Result of validation
*/
export const validateInput = (controllerMethod) => {
  let errors;

  switch (controllerMethod) {
    case 'signup':
      errors = [
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
          .custom(value => User.lookupEmail(value)),

        body('phoneNumber', 'Phone Number must be an 11 digit number')
          .optional().isInt().isLength({ min: 1, max: 11 }),

        body('password')
          .trim()
          .isLength({ min: 1 }).withMessage('Password is required'),

        body('confirmPassword', 'Password confirmation does not match password')
          .trim()
          .isLength({ min: 1 }).withMessage('Password confirmation is required')
          .custom((value, { req }) => (value === req.body.password)),
      ];
      break;

    case 'login':
      errors = [
        body('email', 'Email is required for login')
          .normalizeEmail()
          .isLength({ min: 1 })
          .isEmail().withMessage('Please provide a valid email address'),

        body('password', 'Password is required for login')
          .trim()
          .exists()
          .isLength({ min: 1 }).withMessage('Password cannot be empty'),
      ];
      break;

    case 'party':
      errors = [
        body('name', 'Please provide a party name')
          .trim()
          .isLength({ min: 1 })
          .escape(),

        body('hqAddress', 'HQ Address cannot be empty')
          .optional()
          .trim()
          .isLength({ min: 1 })
          .escape(),

        body('logoUrl', 'Logo URL cannot be empty')
          .optional()
          .trim()
          .isLength({ min: 1 })
          .escape(),
      ];
      break;

    default:
      break;
  }

  return errors;
};

/**
 * Formats the error messages returend from express validator (if any)
 *
 * @param {object} req Request object from the client
 * @returns {object} Error object foratted as key- value pairs
 */
export const validationHandler = (req) => {
  const errors = validationResult(req);
  const parsedErrors = {};

  if (!errors.isEmpty()) {
    errors.array({ onlyFirstError: true }).forEach((error) => {
      parsedErrors[error.param] = error.msg;
    });
  }

  return parsedErrors;
};
