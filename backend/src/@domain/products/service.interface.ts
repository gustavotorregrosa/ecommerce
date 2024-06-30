import { IService } from "../@shared/service.interface";
import { Product } from "./domain";

export interface IProductService extends IService<Product>{

    setCategory: (categoryID: string, productID: string) => Promise<Product> 

}