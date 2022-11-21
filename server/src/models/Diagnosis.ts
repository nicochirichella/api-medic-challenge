import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Disease } from "./Disease";
import { User } from "./User";

@Entity()
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    diagnosisDate: Date

    @Column()
    correctDiagnosis: boolean

    @ManyToMany(() => Disease)
    @JoinTable()
    diseases: Disease[]

    @ManyToOne(() => User, user => user.diagnoses)
    user: User

    constructor(diagnosisDate: Date) {
        this.diagnosisDate = diagnosisDate;
        this.correctDiagnosis = false;
    }

}