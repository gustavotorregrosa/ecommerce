export interface IRepository<T> {

    insert(model: T): Promise<T>
    update(model: T): Promise<T>
    findById(id: string): Promise<T>
    getAll(): Promise<T[]>
    delete(id: string): Promise<void>

}