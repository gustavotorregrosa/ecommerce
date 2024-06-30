import { ProductEntity as Product } from 'src/product/entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({name: 'category'})
export class CategoryEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    name: string

    @OneToMany(() => Product, product => product.category)
    products: Product[]
  
}