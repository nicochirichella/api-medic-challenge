import { Router } from 'express';
import { register, login } from '../controllers/auth';
import { validateRegisterFields } from '../middlewares/auth';

const router = Router();

router.post('/register', validateRegisterFields, register);
router.post('/login', login);

export default router;

