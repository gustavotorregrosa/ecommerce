import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ProductService } from 'src/@domain/products/service';
import { removeUnderlineTransformer } from 'src/common-infra/remove-underline.transformer';
import { ICreateProductDTO } from './dto/ICreateProduct.dto';
import { IEditProductDTO } from './dto/IEditproduct.dto';
import { AppExceptionFilter } from 'src/common-infra/exception.filter';

@Controller('product')
@UseFilters(new AppExceptionFilter())
export class ProductController {

    constructor(private productService: ProductService){}

    @Get()
    async getAllProducts(){
        const products = await this.productService.getAll()
        return removeUnderlineTransformer(products)
    }

    @Post()
    async createProduct(@Body() productDTO: ICreateProductDTO){
        const product = await this.productService.createDtoToModel(productDTO)
        await this.productService.insert(product)
        return removeUnderlineTransformer(product)
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() productDTO: IEditProductDTO){
        const productValues = {
            id,
            ...productDTO
        }
        const product = await this.productService.editDtoToModel(productValues)
        await this.productService.update(product)
        return removeUnderlineTransformer(product)
    }

    @Get(':id')
    async getOneProduct(@Param('id') id: string){
        const product = await this.productService.findById(id)
        return removeUnderlineTransformer(product)
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string){
        const product = await this.productService.delete(id)
        return removeUnderlineTransformer(product)
    }

}
