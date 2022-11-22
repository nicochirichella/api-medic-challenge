import Router from 'express';
import {
  getDiagnosisForUser,
  createDiagnosisForUser,
} from '../controllers/user';

const router = Router();

router.get('/:id/diagnosis', getDiagnosisForUser);
router.post('/:id/diagnosis', createDiagnosisForUser);

export default router;
