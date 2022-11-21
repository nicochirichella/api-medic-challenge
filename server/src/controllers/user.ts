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
        });
        res.status(200).json({
            msg: 'Diagnosis for user',
            data: JSON.stringify(diagnosis),
        });
    } else {
        res.status(404).json({
            msg: 'User not found',
        });
    }
}