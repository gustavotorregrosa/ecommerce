import { Category } from "src/@domain/category/domain";
import { ICategoryRepository } from "src/@domain/category/respository.interface";
import { Repository } from "typeorm";
import { CategoryEntity } from "./entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryTypeOrmRepository implements ICategoryRepository {

    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>){}
    
    async delete(id: string): Promise<Category> {
        const categoryEntity = await this.repository.findOneBy({id})
        await this.repository.delete(categoryEntity)
        return this.entityToModel(categoryEntity) 
    }

    async insert(category: Category): Promise<Category> {
        const categoryEntity = this.repository.create(category)
        await this.repository.insert(categoryEntity)
        return this.entityToModel(categoryEntity)
    }

    async update({id, name}: Category): Promise<Category> {
        await this.repository.update(id, {name})
        const categoryEntity = await this.findById(id)
        return this.entityToModel(categoryEntity)
    }

    async findById(id: string): Promise<Category> {
        const categoryEntity = await this.repository.findOneBy({id})
        return new Category(categoryEntity.name, categoryEntity.id)
        
    }
    async getAll(): Promise<Category[]> {
        const categoryEntities = await this.repository.find()
        return categoryEntities.map(cat => new Category(cat.name, cat.id))
    }

    private entityToModel(entity: CategoryEntity): Category {
        return new Category(entity.name, entity.id)
    }

}