import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { ProductEntity } from './entity';
import { ProductTypeORMRepository } from './repository';
import { ProductService } from 'src/@domain/products/service';
import { DataSource } from 'typeorm';
import { CategoryEntity } from 'src/category/entity';
import { ProductGateway } from './product.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), TypeOrmModule.forFeature([CategoryEntity])],
    providers: [
        ProductTypeORMRepository,
        {
            provide: ProductService,
            inject: [getDataSourceToken()],
            useFactory: (dataSource: DataSource) => new ProductService(new ProductTypeORMRepository(dataSource.getRepository(ProductEntity), dataSource.getRepository(CategoryEntity)))
        },
        ProductGateway
    ],
    controllers: [ProductController]
})
export class ProductModule {}
