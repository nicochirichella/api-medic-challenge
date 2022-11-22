import { Router } from 'express';
import { getPossibleDiagnosis } from '../controllers/diagnosis';

const router = Router();

router.post('/', getPossibleDiagnosis);

export default router;
