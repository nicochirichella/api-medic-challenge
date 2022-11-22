import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { Disease } from "./Disease";
import { User } from "./User";

@Entity()
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    diagnosisDate: Date

    @ManyToOne(() => Disease)
    disease: Disease

    @ManyToOne(() => User, user => user.diagnoses)
    user: User

    constructor(diagnosisDate: Date) {
        this.diagnosisDate = diagnosisDate;
    }

}