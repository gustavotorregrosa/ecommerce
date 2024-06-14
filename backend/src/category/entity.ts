import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'category'})
export class CategoryEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    name: string
  
}