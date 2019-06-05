import expressValidator from 'express-validator';
import routes from './routes';

require('dotenv').config();

//  Load the required middlewares and routes for v1
export default (app, express) => {
  const router = express.Router();
  routes(router);

  router.get('/', (req, res) => {
    res.status(200).send({
      message: 'Welcome to Politico API',
      docs: 'https://politicobooth.docs.apiary.io/',
    });
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(expressValidator());
  app.use('/api/v1', router);
};
