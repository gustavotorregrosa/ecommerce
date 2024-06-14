import { v4 as uuid } from 'uuid';

export class Category {

    constructor(private _name: string, private _id: string = uuid()){}

    get id() { 
        return this._id
    }
  
    set name(value: string){
        this._name = value
    }
    
    get name(){
        return this._name
    }
}
    