import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserTypeOrmRepository } from 'src/users/repository';
import { UserService } from 'src/@domain/user/service';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/users/entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    {
      provide: UserService,
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) => new UserService(new UserTypeOrmRepository(dataSource.getRepository(UserEntity)))
    },
    

  ],
  exports: [AuthService]
})
export class AuthModule {}
