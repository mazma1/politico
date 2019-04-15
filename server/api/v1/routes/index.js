import express from 'express';
import controller from '../controllers/testController';

const router = express.Router();

router.get('/',  controller.test);

export default router;
