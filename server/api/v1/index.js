import expressValidator from 'express-validator';
import routes from './routes';

require('dotenv').config();

//  Load the required middlewares and routes for v1
export default (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(expressValidator());
  app.use('/api/v1', routes);
}
