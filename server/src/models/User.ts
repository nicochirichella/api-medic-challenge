import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

    constructor(userDto: UserDto) {
        this.name = userDto?.name || '';
        this.lastName = userDto?.lastName || '';
        this.email = userDto?.email || '';
        this.id = 0;
        this.password = userDto?.password || '';
    }

}
