import { Router } from "express";
import { addDisease, getDisease, getDiseases, addSymptomToDisease } from "../controllers/disease";

const router = Router();

router.get('/', getDiseases);
router.post('/', addDisease);
router.get('/:id', getDisease);
router.post('/add-symptom', addSymptomToDisease);

export default router;
