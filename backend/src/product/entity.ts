import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { CategoryEntity as Category,  } from "src/category/entity"

@Entity({name: 'product'})
export class ProductEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    name: string

    @Column()
    description: string

    @ManyToOne(() => Category, category => category.products)
    category: Category

}