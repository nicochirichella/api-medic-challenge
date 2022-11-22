import logger from '../utils/logger';
import { Disease } from '../models/Disease';
import { Symptom } from '../models/Symptom';
import { AppDataSource } from '../db/data-source';
import { Request, Response } from 'express';

export const getDiseases = async (req: Request, res: Response) => {
  const DiseaseRepository = AppDataSource.getRepository(Disease);
  const diseases = await DiseaseRepository.find();

  res.status(200).json({
    msg: 'Diseases',
    data: JSON.stringify(diseases),
  });
};

export const addDisease = async (req: Request, res: Response) => {
  const DiseaseRepository = AppDataSource.getRepository(Disease);
  const disease = new Disease(req.body.name, req.body.description);
  const savedDisease = await DiseaseRepository.save(disease);
  logger.info('Disease saved successfully');
  res.status(200).json({
    msg: 'Disease added successfully',
    data: JSON.stringify(savedDisease),
  });
};

export const getDisease = async (req: Request, res: Response) => {
  const DiseaseRepository = AppDataSource.getRepository(Disease);
  const id: number = parseInt(req.params.id);
  const disease = await DiseaseRepository.findOne({
    where: { id },
    relations: ['symptoms'],
  });

  console.log(JSON.stringify(disease?.symptoms));
  if (disease) {
    res.status(200).json({
      msg: 'Disease',
      data: JSON.stringify(disease),
    });
  } else {
    res.status(404).json({
      msg: 'Disease not found',
    });
  }
};

export const addSymptomToDisease = async (req: Request, res: Response) => {
  const DiseaseRepository = AppDataSource.getRepository(Disease);
  const SymptomRepository = AppDataSource.getRepository(Symptom);
  const { diseaseId, symptomId } = req.body;
  const disease = await DiseaseRepository.findOne({ where: { id: diseaseId } });
  const symptoms = await SymptomRepository.findOne({
    where: { id: symptomId },
  });

  if (disease && symptoms) {
    const symptomsList = disease.symptoms || [];
    symptomsList.push(symptoms);
    disease.symptoms = symptomsList;
    await DiseaseRepository.save(disease);
  } else {
    res.status(404).json({
      msg: 'Disease or symptom not found',
    });
  }

  res.status(200).json({
    msg: 'Disease and symptoms',
    data: JSON.stringify(disease),
  });
};
