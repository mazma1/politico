import { User } from '../../../models';
import { validationResult } from 'express-validator/check';
import { parseErrors } from '../middleware/validate';

const authController = {
  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const parsedErrors = parseErrors(errors.array({ onlyFirstError: true }));
      return res.status(422).json({ errors: parsedErrors })
    }

    const { firstname, lastname, email, password, phoneNumber } = req.body
    try {
      const newUser = await User.create({ firstname, lastname, email, password, phoneNumber });
      return res.status(201).json({
        data: {
          token: 'to be disclosed',
          user: { 
            id: newUser.id,
            isAdmin: newUser.isAdmin,
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
