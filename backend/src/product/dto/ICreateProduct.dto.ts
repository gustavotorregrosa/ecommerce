import { Category } from "src/@domain/category/domain"

export class ICreateProductDTO {
    name: string
    descripion?: string
    category: Category
}