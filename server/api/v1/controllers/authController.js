import { User } from '../../../models';
import { validationResult } from 'express-validator/check';
import { parseErrors } from '../middleware/validateInput';
import generateToken from '../../../utils/generateToken';

const authController = {
  /**
    * Creates a new user
    * Route: POST: /api/v1/auth/signup
    * 
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    * @returns {object} Authentication token and user details
  */
  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const parsedErrors = parseErrors(errors.array({ onlyFirstError: true }));
      return res.status(422).json({ errors: parsedErrors })
    }

    const { firstname, lastname, email, password, phoneNumber } = req.body
    try {
      const newUser = await User.create({ firstname, lastname, email, password, phoneNumber });
      const token = generateToken(newUser);

      return res.status(201).json({
        data: {
          token,
          user: {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email, 
            phoneNumber:newUser.phoneNumber 
          }
        } 
      })
    } catch(error) {
      return res.status(500).json({ error: error.message });
    }
    
  }
};

export default authController;
