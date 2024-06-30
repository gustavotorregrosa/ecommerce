import { ICreateProductDTO } from "src/product/dto/ICreateProduct.dto";
import { IRepository } from "../@shared/repository.interface";
import { Product } from "./domain";
import { IEditProductDTO } from "src/product/dto/IEditproduct.dto";

export interface IProductRepository extends IRepository<Product>{

    setCategory: (categoryID: string, productID: string) => Promise<Product> 
    createDtoToModel: (productDTO: ICreateProductDTO) => Promise<Product>
    editDtoToModel: (productDTO: IEditProductDTO) => Promise<Product>

}