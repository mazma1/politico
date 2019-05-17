import { User } from '../../../models';
import { validationHandler } from '../middleware/validateInput';
import generateToken from '../../../utils/generateToken';
import response from '../../../utils/responseWrapper';

const authController = {
  /**
    * Creates a new user
    * Route: POST /api/v1/auth/signup
    *
    * @param {object} req - Incoming request object from the client
    * @param {object} res - Response object sent back to client
    * @returns {object} Authentication token and user details
  */
  signup: async (req, res) => {
    const validationError = validationHandler(req);

    if (Object.keys(validationError).length > 0) {
      return response(422, { errors: validationError }, res);
    }

    const { firstname, lastname, email, password, phoneNumber } = req.body;
    try {
      const newUser = await User.create({ firstname, lastname, email, password, phoneNumber });
      const token = generateToken(newUser);
      const payload = {
        data: {
          token,
          user: {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
          },
        },
      };
      return response(201, payload, res);
    } catch (error) {
      return response(500, { error: error.message }, res);
    }
  },

  /**
    * Authenticates and logs a user in
    * Route: POST /api/v1/auth/login
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    * @returns {object} Authentication token and user details
  */
  login: async (req, res) => {
    const validationError = validationHandler(req);

    if (Object.keys(validationError).length > 0) {
      return response(422, { errors: validationError }, res);
    }

    const { email, password } = req.body;
    try {
      const user = await User.findByLogin(email);

      if (!user) {
        return response(401, { error: 'Invalid username or password' }, res);
      }

      const isCorrectPassword = user.isCorrectPassword(password, user);
      if (!isCorrectPassword) {
        return response(401, { error: 'Invalid username or password' }, res);
      }
      const token = generateToken(user);
      const payload = {
        data: {
          token,
          user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phoneNumber: user.phoneNumber,
          },
        },
      };
      return response(200, payload, res);
    } catch (error) {
      return response(500, { error: error.message }, res);
    }
  },
};

export default authController;
