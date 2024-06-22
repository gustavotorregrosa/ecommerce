import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'user'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    passwordHash: string

    @Column()
    image: string
  
}