import { Category } from "./domain"
import { CategoryService } from "./service"
import { ICategoryService } from "./service.interface"


describe('category service', () => {

    let repository: ICategoryService
    let service: ICategoryService

    beforeEach(() => {
        repository = {
            delete: jest.fn(),
            findById: jest.fn(),
            getAll: jest.fn(),
            insert: jest.fn(),
            update: jest.fn()
        }

        service = new CategoryService(repository)
    })

    it('get all', async () => {
        const categoryList = await service.getAll()
        expect(repository.getAll).toHaveBeenCalled()
        expect(repository.findById).not.toHaveBeenCalled()
    })

    it('get one by id', async () => {
        const category = await service.findById('1234567890')
        expect(repository.getAll).not.toHaveBeenCalled()
        expect(repository.findById).toHaveBeenCalled()
    })

    it('save new category', async () => {
        const category: Category = new Category('Sports')
        await service.insert(category)
        expect(repository.insert).toHaveBeenCalled()
        expect(repository.update).not.toHaveBeenCalled()
    })

    it('save existing category', async () => {
        const category: Category = new Category('Sports')
        await service.update(category)
        expect(repository.insert).not.toHaveBeenCalled()
        expect(repository.update).toHaveBeenCalled()
    })

    it('save existing category', async () => {
        await service.delete('12345789')
        expect(repository.update).not.toHaveBeenCalled()
        expect(repository.delete).toHaveBeenCalled()
    })




})