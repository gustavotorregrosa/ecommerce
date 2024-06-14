import { User } from "src/@domain/user/domain";
import { IUserRepository } from "src/@domain/user/repository.interface";
import { Repository } from "typeorm";
import { UserEntity } from "./entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {

    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>){}

    async findByEmail(email: string): Promise<User> {
        const userEntity = await this.repository.findOneBy({email})
        try {
            return new User(userEntity.name, userEntity.email, userEntity.passwordHash, userEntity.id)
        } catch (error) {
            throw new Error('User not found')
        }
        
    }
    
    async delete(id: string): Promise<void> {
        const userEntity = await this.repository.findOneBy({id})
        await this.repository.delete(userEntity)
    }

    async insert(user: User): Promise<void> {
        const userModel = this.repository.create(user)
        await this.repository.insert(userModel)
    }

    async update({id, name}: User): Promise<void> {
        await this.repository.update(id, {name})
    }

    async findById(id: string): Promise<User> {
        const userEntity = await this.repository.findOneBy({id})
        return new User(userEntity.name, userEntity.email, userEntity.passwordHash, userEntity.id)
        
    }
    async getAll(): Promise<User[]> {
        const userEntities = await this.repository.find()
        return userEntities.map(user => new User(user.name, user.email, user.passwordHash, user.id))
    }

}