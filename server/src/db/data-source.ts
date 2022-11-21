import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/User"
import { Symptom } from "../models/Symptom"
import { Disease } from "../models/Disease"
import { Diagnosis } from "../models/Diagnosis"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Symptom, Disease, Diagnosis],
    migrations: [],
    subscribers: [],
})
