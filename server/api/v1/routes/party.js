import controller from '../controllers/partyController';
import Authorize from '../middleware/auth';

const partyRoutes = (router) => {
  router.route('/parties')
    .post(Authorize.isLoggedIn, Authorize.isAdmin, controller.createParty);
};

export default partyRoutes;
