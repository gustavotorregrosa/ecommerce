import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/@domain/category/domain";
import { Product } from "src/@domain/products/domain";
import { IProductRepository } from "src/@domain/products/respository.interface";
import { ProductEntity } from "./entity";
import { Repository } from "typeorm";
import { CategoryEntity } from "src/category/entity";
import { ICreateProductDTO } from "./dto/ICreateProduct.dto";

export class ProductTypeORMRepository implements IProductRepository {

    constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>, @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>){}
    
    async createDtoToModel(productDTO: ICreateProductDTO): Promise<Product>{
        const product = new Product(productDTO.name, productDTO.descripion)
        const category = await this.categoryRepository.findOneBy({id: productDTO.category})
        product.category = new Category(category.name, category.id)
        return product
    }

    async setCategory(categoryID: string, productID: string): Promise<Product> {
        const productEntity = await this.productRepository.findOneBy({id: productID})
        const categoryEntity = await this.categoryRepository.findOneBy({id: categoryID})
        productEntity.category = categoryEntity
        await this.productRepository.save(productEntity)
        return this.entityToModel(productEntity)
    }
    
    async insert(product: Product): Promise<Product> {
        const productEntity = this.productRepository.create(product)
        const categoryEntity = this.categoryRepository.findOneBy({id: product.category.id })
        await this.productRepository.insert(productEntity)
        return this.entityToModel(productEntity)
    }

    async update(model: Product): Promise<Product> {
        const productEntity = await this.productRepository.findOneBy({id: model.id})
        productEntity.name = model.name
        productEntity.description = model.description
        const categoryEntity = await this.categoryRepository.findOneBy({id: model.category.id})
        productEntity.category = categoryEntity
        await this.productRepository.save(productEntity)
        return this.entityToModel(productEntity)
    }

    async findById(id: string): Promise<Product> {
        const productEntity = await this.productRepository.findOneBy({id})
        return this.entityToModel(productEntity)
    }

    async getAll(): Promise<Product[]> {
        const productEntities = await this.productRepository.find()
        return productEntities.map(productEntity => this.entityToModel(productEntity))
    }

    async delete(id: string): Promise<Product> {
        const productEntitiy = await this.productRepository.findOneBy({id})
        await this.productRepository.delete(productEntitiy)
        return this.entityToModel(productEntitiy) 
    }


    entityToModel(entity: ProductEntity): Product {
        const product = new Product(entity.name, entity.description, entity.id)
        if(entity.category){
            const category = new Category(entity.category.name, entity.category.id)
            product.category = category
        }

        return product
        
    }

    


}