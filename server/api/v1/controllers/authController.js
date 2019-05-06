import { validationResult } from 'express-validator/check';
import { parseErrors } from '../middleware/validate';

const authController = {
  signup: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const parsedErrors = parseErrors(errors.array({ onlyFirstError: true }));
      res.status(422).json({ errors: parsedErrors })
    }
  }
};

export default authController;
