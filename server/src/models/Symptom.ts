import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Symptom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
