import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Request, UseFilters } from '@nestjs/common';
import { ICreateCategoryDTO } from './dto/ICreateCategory.dto';
import { Category } from 'src/@domain/category/domain';
import { IEditCategoryDTO } from './dto/IEditCategory.dto';
import { AppExceptionFilter } from 'src/common-infra/exception.filter';
import { CategoryService } from 'src/@domain/category/service';
import { AuthService } from 'src/auth/auth.service';

@Controller('category')
@UseFilters(new AppExceptionFilter())
export class CategoryController {

    constructor(private categoryService: CategoryService, private authService: AuthService){
        // console.log(this.authService.getUserFromRequest())
    }

    @Get()
    async getAllCategories(){
        return await this.categoryService.getAll()
    }

    @Post()
    async createCategory(@Body() categoryDTO: ICreateCategoryDTO){
        const category = new Category(categoryDTO.name)
        return await this.categoryService.insert(category)
    }

    @Patch()
    async updateCategory(@Body() categoryDTO: IEditCategoryDTO){
        const category =  await this.categoryService.findById(categoryDTO.id)
        category.name = categoryDTO.name
        return await this.categoryService.update(category)
    }

    @Get(':id')
    async getOneCategory(@Param('id') id: string){
        return await this.categoryService.findById(id)
       
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string){
        return await this.categoryService.delete(id)
    }

}
