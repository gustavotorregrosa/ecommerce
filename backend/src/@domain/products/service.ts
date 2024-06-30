import { IProductService } from "./service.interface"
import { Product } from "./domain"
import { IProductRepository } from "./respository.interface"
import { ICreateProductDTO } from "src/product/dto/ICreateProduct.dto"

export class ProductService implements IProductService{

    constructor(private productRepository: IProductRepository){}

    setCategory(category: string, product: string): Promise<Product> {
        return this.productRepository.setCategory(category, product)
    }

    delete(id: string): Promise<Product> {
        return this.productRepository.delete(id)
    }

    insert(product: Product): Promise<Product> {
        return this.productRepository.insert(product)      
    }

    update(category: Product): Promise<Product> {
        return this.productRepository.update(category)
    }

    findById(id: string): Promise<Product> {
        return this.productRepository.findById(id)
    }

    getAll(): Promise<Product[]> {
        return this.productRepository.getAll()
    }

    createDtoToModel(productDTO: ICreateProductDTO):Promise<Product> {
        return this.productRepository.createDtoToModel(productDTO)
    }
    
}