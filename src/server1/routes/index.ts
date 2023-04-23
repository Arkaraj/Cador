import express from 'express';
const router = express.Router();
import swordController from '../controller';

router.get('/', swordController.getASword);

export default router;
