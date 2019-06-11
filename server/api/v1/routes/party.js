import { sanitizeParam } from 'express-validator/filter';
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

  router.route('/parties/:id')
    .patch(
      Authorize.isLoggedIn,
      Authorize.isAdmin,
      sanitizeParam('id'),
      validateInput('party'),
      controller.updateParty,
    );
};

export default partyRoutes;
