import express from 'express';
const router = express.Router();
import swordRoute from './routes';

router.use('/', swordRoute);

export default router;
