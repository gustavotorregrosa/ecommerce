import { IUserService, IUserTransformed } from "./service.interface"
import { User } from "./domain"
import { IUserRepository } from "./repository.interface" 

export class UserService implements IUserService{

    constructor(private userRepository: IUserRepository){}

    transformer(user: User): IUserTransformed {
      const userTransformed: IUserTransformed = {
        email: user.email,
        id: user.id,
        name: user.name
      }

      return userTransformed
    }
  
    
    findByEmail(email: string): Promise<User>{
        return this.userRepository.findByEmail(email)
    }

    delete(id: string): Promise<void> {
        return this.userRepository.delete(id)
    }

    insert(user: User): Promise<void> {
        return this.userRepository.insert(user)      
    }

    update(user: User): Promise<void> {
        return this.userRepository.update(user)
    }

    findById(id: string): Promise<User> {
        return this.userRepository.findById(id)
    }

    getAll(): Promise<User[]> {
        return this.userRepository.getAll()
    }
    
}