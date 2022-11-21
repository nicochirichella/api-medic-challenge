import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm"
import { Diagnosis } from "./Diagnosis"

type UserDto = {
    id?: number,
    name: string,
    lastName: string,
    gender: string,
    birthDate: string,
    email: string,
    password: string,
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Diagnosis, diagnosis => diagnosis.user)
    @JoinTable()
    diagnoses: Diagnosis[]

    constructor(userDto: UserDto) {
        this.name = userDto?.name || '';
        this.lastName = userDto?.lastName || '';
        this.email = userDto?.email || '';
        this.password = userDto?.password || '';
    }

}
