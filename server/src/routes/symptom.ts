import { Router } from "express";
import { addSymptom } from "../controllers/symptom";

const router = Router();

router.post('/', addSymptom);

export default router;