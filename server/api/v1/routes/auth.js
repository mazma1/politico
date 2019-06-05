import { validateInput } from '../middleware/validateInput';
import controller from '../controllers/authController';

const authRoutes = (router) => {
  router.post('/auth/signup', validateInput('signup'), controller.signup);
  router.post('/auth/login', validateInput('login'), controller.login);
};

export default authRoutes;
