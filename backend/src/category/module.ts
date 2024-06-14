import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity';
import { CategoryTypeOrmRepository } from './repository';
import { CategoryController } from './category.controller';
import {CategoryService} from 'src/@domain/category/service'
import { DataSource } from 'typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity]), AuthModule],
    providers: [
        CategoryTypeOrmRepository,
        {
            provide: CategoryService,
            inject: [getDataSourceToken()],
            useFactory: (dataSource: DataSource) => new CategoryService(new CategoryTypeOrmRepository(dataSource.getRepository(CategoryEntity)))
        }
    ],
    controllers: [CategoryController]
})
export class CategoryModule{}
