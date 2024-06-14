import { Module } from '@nestjs/common';
import { UserService } from 'src/@domain/user/service';
import { UserEntity } from './entity';
import { UserTypeOrmRepository } from './repository';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserTypeOrmRepository,
    {
      provide: UserService,
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) => new UserService(new UserTypeOrmRepository(dataSource.getRepository(UserEntity)))
    }
  
  ],
  // exports: [UserEntity]
  
})
export class UsersModule {}
