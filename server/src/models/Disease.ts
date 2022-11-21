import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Symptom } from "./Symptom";

@Entity()
export class Disease {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => Symptom, { cascade: true })
    @JoinTable()
    symptoms: Symptom[]

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

}