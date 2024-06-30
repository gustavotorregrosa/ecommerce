import { Category } from "src/@domain/category/domain"

export class IEditProductDTO {
    id: string
    name: string
    descripion?: string
    category: Category
}