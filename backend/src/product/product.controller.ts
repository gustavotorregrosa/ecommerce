import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from 'src/@domain/products/service';
import { removeUnderlineTransformer } from 'src/common-infra/remove-underline.transformer';
import { ICreateProductDTO } from './dto/ICreateProduct.dto';
import { Product } from 'src/@domain/products/domain';

@Controller('product')
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
        return product
        await this.productService.insert(new Product(productDTO.name, productDTO.descripion)) 
        return removeUnderlineTransformer(product)
    }




}
