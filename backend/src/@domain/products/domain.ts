import { v4 as uuid } from 'uuid';
import { Category } from '../category/domain';

export class Product {
    product: Promise<import("/Users/gustavo/projects/e-commerce/backend/src/category/entity").CategoryEntity>;

    constructor(private _name: string, private _description: string, private _id: string = uuid()){}

    get id() { 
        return this._id
    }
  
    set name(value: string){
        this._name = value
    }
    
    get name(){
        return this._name
    }

    get description(){
        return this._description
    }

    set description(value: string){
        this._description = value
    }

    private _category: Category

    set category(value: Category){
        this._category = value
    }

    get category(){
        return this._category
    }

}
    