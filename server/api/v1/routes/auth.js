import express from 'express';
import { validateInput } from '../middleware/validateInput';
import controller from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/auth/signup', validateInput('signup'), controller.signup);

export default authRouter;
