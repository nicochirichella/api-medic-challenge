import logger from "../utils/logger";
import { Request, Response } from "express";
import { User } from "../models/User";
import { Diagnosis } from "../models/Diagnosis";
import { Disease } from "../models/Disease";
import { AppDataSource } from "../db/data-source";

export const getDiagnosisForUser = async (req: Request, res: Response) => {
    const DiagnosisRepository = AppDataSource.getRepository(Diagnosis);
    const UserRepository = AppDataSource.getRepository(User);
    const userId: number = parseInt(req.params.id);
    const user = await UserRepository.findOne({
        where: { id: userId },
    });
    if (user) {
        const diagnosis = await DiagnosisRepository.find({
            where: { user: user },
            relations: ["disease"],
        });

        const response = diagnosis.map((d) => {
            return {
                id: d.id,
                diagnosisDate: d.diagnosisDate,
                disease: d.disease.name,
            };
        });

        res.status(200).json({
            msg: 'Diagnosis for user',
            data: JSON.stringify(response),
        });
    } else {
        res.status(404).json({
            msg: 'User not found',
        });
    }
}

export const createDiagnosisForUser = async (req: Request, res: Response) => {
    const DiagnosisRepository = AppDataSource.getRepository(Diagnosis);
    const UserRepository = AppDataSource.getRepository(User);
    const DiseaseRepository = AppDataSource.getRepository(Disease);

    const userId: number = parseInt(req.params.id);
    const user = await UserRepository.findOne({
        where: { id: userId },
    });
    if (user) {
        const diagnosis = new Diagnosis(new Date());
        diagnosis.user = user;
        const diseaseIds = req.body.diseaseIds;
        const disease = await DiseaseRepository.findOneOrFail({
            where: { id: diseaseIds },
        });

        diagnosis.disease = disease;
        await DiagnosisRepository.save(diagnosis);
        res.status(200).json({
            msg: 'Diagnosis created',
            data: JSON.stringify(diagnosis),
        });
    } else {
        res.status(404).json({
            msg: 'User not found',
        });
    }
}

