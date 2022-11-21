import Router from 'express';
import { getDiagnosisForUser } from '../controllers/user';

const router = Router();

router.get('/:id/diagnosis', getDiagnosisForUser);

export default router;
