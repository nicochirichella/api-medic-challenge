import { Router } from "express";
import { addSymptom } from "../controllers/symptom";

const router = Router();

router.post('/add', addSymptom);

export default router;