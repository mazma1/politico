import express from 'express';
import authRouter from './auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Politico API',
    docs: 'https://politicobooth.docs.apiary.io/',
  });
});
router.use(authRouter);

export default router;
