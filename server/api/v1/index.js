import routes from './routes';

//  Connect the required middlewares for v1
export default (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/v1', routes);
}
