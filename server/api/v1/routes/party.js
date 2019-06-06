import controller from '../controllers/partyController';
import Authorize from '../middleware/auth';
import { validateInput } from '../middleware/validateInput';

const partyRoutes = (router) => {
  router.route('/parties')
    .post(
      Authorize.isLoggedIn,
      Authorize.isAdmin,
      validateInput('party'),
      controller.createParty,
    );
};

export default partyRoutes;
