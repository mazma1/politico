/* eslint-disable import/no-dynamic-require, global-require */
import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

// middleware to load the required endpoint based on the request URL
const loadApp = (req, res, next) => {
  const match = req.url.match(/\/api\/(v[0-9]+).*/) || [];
  const version = match[1] || '';

  if (version !== '') {
    const appPath = path.join(__dirname, `./server/api/${version}/index.js`);
    const pathExists = fs.existsSync(appPath);

    if (!pathExists) {
      return res.status(404).send({
        message: 'The requested endpoint does not exist',
      });
    }
    require(appPath).default(app, express);
  } else {
    // require('./client/index').default(app)
    return res.status(200).send({
      message: 'Loaded the client app',
    });
  }
  next();
};

app.use(loadApp);

export default app;
