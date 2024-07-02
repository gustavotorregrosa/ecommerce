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
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/entity';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPE as 'mysql' | 'postgres',
      host: process.env.HOST,
      port: process.env.PORT as unknown as number,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [CategoryEntity, UserEntity, ProductEntity],
      synchronize: true,
    }),
    CategoryModule,
    AuthModule,
    UsersModule,
    ProductModule    
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UserService, CategoryGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes(CategoryController)
  }
}
