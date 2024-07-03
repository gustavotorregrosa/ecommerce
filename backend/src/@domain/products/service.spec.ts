import { Product } from "./domain"
import { IProductRepository } from "./respository.interface"
import { ProductService } from "./service"
import { IProductService } from "./service.interface"


describe('product service', () => {

    let repository: IProductRepository
    let service: IProductService

    beforeEach(() => {
        repository = {
            delete: jest.fn(),
            findById: jest.fn(),
            getAll: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
            createDtoToModel: jest.fn(),
            editDtoToModel: jest.fn(),
            setCategory: jest.fn()

        }

        service = new ProductService(repository)
    })

    it('get all', async () => {
        const productList = await service.getAll()
        expect(repository.getAll).toHaveBeenCalled()
        expect(repository.findById).not.toHaveBeenCalled()
    })

    it('get one by id', async () => {
        const product = await service.findById('1234567890')
        expect(repository.getAll).not.toHaveBeenCalled()
        expect(repository.findById).toHaveBeenCalled()
    })

    it('save new product', async () => {
        const product: Product = new Product('Soccer ball', 'Nike Jabulani')
        await service.insert(product)
        expect(repository.insert).toHaveBeenCalled()
        expect(repository.update).not.toHaveBeenCalled()
    })

    it('save existing product', async () => {
        const product: Product = new Product('Soccer ball', 'Nike Jabulani')
        await service.update(product)
        expect(repository.insert).not.toHaveBeenCalled()
        expect(repository.update).toHaveBeenCalled()
    })

    it('save existing product', async () => {
        await service.delete('12345789')
        expect(repository.update).not.toHaveBeenCalled()
        expect(repository.delete).toHaveBeenCalled()
    })




})