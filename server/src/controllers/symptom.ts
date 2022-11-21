import logger from "../utils/logger";
import { Symptom } from "../models/Symptom";
import { AppDataSource } from "../db/data-source";
import { Request, Response } from "express";

export const getSymptoms = async (req: Request, res: Response) => {
    const SymptomRepository = AppDataSource.getRepository(Symptom);
    const symptoms = await SymptomRepository.find();
    logger.info(JSON.stringify(symptoms));
    res.status(200).json({
        msg: 'Symptoms',
        data: JSON.stringify(symptoms),
    });
}

export const addSymptom = async (req: Request, res: Response) => {
    const SymptomRepository = AppDataSource.getRepository(Symptom);
    const symptom = new Symptom(
        req.body.name,
        req.body.description,
    );
    const savedSymtpom = await SymptomRepository.save(symptom);
    logger.info('Symptom saved successfully');
    res.status(200).json({
        msg: 'Symptom added successfully',
        data: JSON.stringify(savedSymtpom),
    });
}