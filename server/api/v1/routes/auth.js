import express from 'express';
import { validateInput } from '../middleware/validateInput';
import controller from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/auth/signup', validateInput('signup'), controller.signup);
authRouter.post('/auth/login', validateInput('login'), controller.login);

export default authRouter;
