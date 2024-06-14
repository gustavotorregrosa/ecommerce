export interface IRepository<T> {

    insert(model: T): Promise<void>
    update(model: T): Promise<void>
    findById(id: string): Promise<T>
    getAll(): Promise<T[]>
    delete(id: string): Promise<void>

}