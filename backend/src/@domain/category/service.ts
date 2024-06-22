import { ICategoryService } from "./service.interface"
import { Category } from "./domain"
import { ICategoryRepository } from "./respository.interface"

export class CategoryService implements ICategoryService{

    constructor(private categoryRepository: ICategoryRepository){}

    delete(id: string): Promise<void> {
        return this.categoryRepository.delete(id)
    }

    insert(category: Category): Promise<Category> {
        return this.categoryRepository.insert(category)      
    }

    update(category: Category): Promise<Category> {
        return this.categoryRepository.update(category)
    }

    findById(id: string): Promise<Category> {
        return this.categoryRepository.findById(id)
    }

    getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll()
    }
    
}