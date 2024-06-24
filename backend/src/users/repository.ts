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
            return new User(userEntity.name, userEntity.email, userEntity.passwordHash, userEntity.image, userEntity.id)
        } catch (error) {
            throw new Error('User not found')
        }
        
    }
    
    async delete(id: string): Promise<void> {
        const userEntity = await this.repository.findOneBy({id})
        await this.repository.delete(userEntity)
    }

    async insert(user: User): Promise<User> {
        const userEntity = this.repository.create(user)
        await this.repository.insert(userEntity)
        return this.entityToModel(userEntity)

    }

    async update({id, name}: User): Promise<User> {
        await this.repository.update(id, {name})
        const categoryUser = await this.findById(id)
        return this.entityToModel(categoryUser)
    }

    async findById(id: string): Promise<User> {
        const userEntity = await this.repository.findOneBy({id})
        return new User(userEntity.name, userEntity.email, userEntity.passwordHash, userEntity.image, userEntity.id)
        
    }
    async getAll(): Promise<User[]> {
        const userEntities = await this.repository.find()
        return userEntities.map(user => new User(user.name, user.email, user.passwordHash, user.id))
    }


    private entityToModel(entity: UserEntity): User {
        return new User(entity.name, entity.email, entity.passwordHash, entity.image, entity.id)
    }


}