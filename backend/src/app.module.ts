import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category/entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserService } from './@domain/user/service';
import { UserEntity } from './users/entity';
import { UserAuthMiddleware } from './auth/user-auth/user-auth.middleware';
import { CategoryController } from './category/category.controller';
import { AuthService } from './auth/auth.service';
import { CategoryGateway } from './category/category.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ecommerce',
      entities: [CategoryEntity, UserEntity],
      synchronize: true,
    }),
    CategoryModule,
    AuthModule,
    UsersModule    
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UserService, CategoryGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes(CategoryController)
  }
}
