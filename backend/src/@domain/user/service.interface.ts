import { IService } from "../@shared/service.interface";
import { User } from "./domain";

export interface IUserTransformed {
    id: string
    name: string
    email: string
    image?: string
}

export interface IUserService extends IService<User>{
    findByEmail: (email: string) => Promise<User>
    transformer: (user: User) => IUserTransformed
}