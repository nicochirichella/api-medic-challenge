import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Symptom } from '../models/Symptom';
import { Disease } from '../models/Disease';
import { Diagnosis } from '../models/Diagnosis';
import config from '../config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: parseInt(config.db.port || '5432'),
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [User, Symptom, Disease, Diagnosis],
  migrations: [],
  subscribers: [],
});
