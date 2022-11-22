import logger from '../utils/logger';
import { Request, Response } from 'express';
import { Symptom } from '../models/Symptom';
import { AppDataSource } from '../db/data-source';
import { getDiseasesBySymptoms } from '../services/diagnosis';
import { In } from 'typeorm';

export const getPossibleDiagnosis = async (req: Request, res: Response) => {
  try {
    const SymptomRepository = AppDataSource.getRepository(Symptom);
    const symptomIds = req.body.symptomIds;
    const symptoms = await SymptomRepository.findBy({
      id: In(symptomIds),
    });
    const diseases = await getDiseasesBySymptoms(symptoms);
    const response = diseases.map((d) => {
      return {
        id: d.id,
        name: d.name,
      };
    });
    res.status(200).json({
      msg: 'Possible diagnosis',
      data: JSON.stringify(response),
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};
