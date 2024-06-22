import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt'

export class User {

    private _name
    private _email
    private _password_hash
    private _id
    private _image

    constructor(_name: string, _email: string,  _password: string, _image: string, _id: string = null){
        this._name = _name
        this._email = _email
        this._id = _id ?? uuid()
        this._image = _image
        if(_id){
            this._password_hash = _password
        } else {
            this.passwordHash = _password
        }

    }

    get id() { 
        return this._id
    }
  
    set name(value: string){
        this._name = value
    }
    
    get name(){
        return this._name
    }

    set email(value: string){
        this._email = value
    }
    
    get email(){
        return this._email
    }

    set passwordHash(value: string){
        this._password_hash = bcrypt.hashSync(value, 12)
    }
    
    get passwordHash(){
        return this._password_hash
    }

    get image(){
        return this._image
    }

    set image(value: string){
        this._image = value
    }
}
    