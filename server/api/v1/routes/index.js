import authRoutes from './auth';
import partyRoutes from './party';

const routes = (router) => {
  authRoutes(router);
  partyRoutes(router);
};

export default routes;
