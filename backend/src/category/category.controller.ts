import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Request, UseFilters } from '@nestjs/common';
import { ICreateCategoryDTO } from './dto/ICreateCategory.dto';
import { Category } from 'src/@domain/category/domain';
import { IEditCategoryDTO } from './dto/IEditCategory.dto';
import { AppExceptionFilter } from 'src/common-infra/exception.filter';
import { CategoryService } from 'src/@domain/category/service';
import { AuthService } from 'src/auth/auth.service';
import { removeUnderlineTransformer } from 'src/common-infra/remove-underline.transformer';

@Controller('category')
@UseFilters(new AppExceptionFilter())
export class CategoryController {

    constructor(private categoryService: CategoryService, private authService: AuthService){}

    @Get()
    async getAllCategories(){
        const categories = await this.categoryService.getAll()
        return removeUnderlineTransformer(categories)
    }

    @Post()
    async createCategory(@Body() categoryDTO: ICreateCategoryDTO){
        const category = await this.categoryService.insert(new Category(categoryDTO.name)) 
        return removeUnderlineTransformer(category)
    }

    @Patch(':id')
    async updateCategory(@Param('id') id: string, @Body() categoryDTO: IEditCategoryDTO){
        const category =  await this.categoryService.findById(id)
        category.name = categoryDTO.name
        await this.categoryService.update(category)
        return removeUnderlineTransformer(category)
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
