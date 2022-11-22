import { AppDataSource } from '../db/data-source';
import { Disease } from '../models/Disease';
import { Symptom } from '../models/Symptom';

export const getDiseasesBySymptoms = async (symptoms: Symptom[]) => {
  const DiseaseRepository = AppDataSource.getRepository(Disease);
  const diseases = await DiseaseRepository.find({ relations: ['symptoms'] });
  const diseasesWithSymptoms = diseases.filter((disease) => {
    const diseaseSymptoms = disease.symptoms || [];
    return symptoms.every((symptom) =>
      diseaseSymptoms.some((diseaseSymptom) => diseaseSymptom.id === symptom.id)
    );
  });
  return diseasesWithSymptoms;
};
