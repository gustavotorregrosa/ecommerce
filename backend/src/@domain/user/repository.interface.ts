import { IRepository } from "../@shared/repository.interface";
import { User } from "./domain";

export interface IUserRepository extends IRepository<User>{
    findByEmail: (email: string) => Promise<User>
}