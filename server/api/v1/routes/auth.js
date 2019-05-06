import express from 'express';
import { validate } from '../middleware/validate';
import controller from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/auth/signup', validate('signup'), controller.signup);

export default authRouter;
