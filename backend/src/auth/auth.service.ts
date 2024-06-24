import { Inject, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/@domain/user/service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/@domain/user/domain';
import { JwtService } from '@nestjs/jwt';
import { IUserTransformed } from 'src/@domain/user/service.interface';
import { jwtConstants } from './constants';
import { IRequestWithUser } from './user-auth/user-auth.middleware';
import { REQUEST } from '@nestjs/core';

interface IJWTToken {
  email: string,
  id: string
  name: string,
  iat: number,
  exp: number,
  image: string
}

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, @Inject(REQUEST) private request: IRequestWithUser) { }

  async signIn(email: string, password: string) {
    let user: User
    try {
      user = await this.userService.findByEmail(email)
    } catch (error) {
      throw new UnauthorizedException()
    }

    const validation = user && bcrypt.compareSync(password, user.passwordHash)
    if (!validation) {
      throw new UnauthorizedException()
    }

    const userTransformed: IUserTransformed = this.userService.transformer(user)
    return await this.userToPayload(userTransformed)
  }

  async userToPayload(user: IUserTransformed): Promise<IUserTransformed & { access_token: string; access_refresh_token: string }> {
    const access_token = await this.jwtService.signAsync(user)
    const access_refresh_token = await this.jwtService.signAsync(user, {
      secret: jwtConstants.refreshSecret,
      expiresIn: '1m'
    })

    return {
      ...user,
      access_token,
      access_refresh_token
    }
  }

  async getUserFromToken(access_token: string): Promise<IJWTToken> {
    try {
      return await this.jwtService.verifyAsync(access_token)
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserFromRefreshToken(access_refresh_token: string): Promise<IUserTransformed & { access_token: string; access_refresh_token: string }> {
    try {
      let userTolken: IJWTToken = await this.jwtService.verifyAsync(access_refresh_token, {
        secret: jwtConstants.refreshSecret,
      })

      const user = await this.userService.findById(userTolken.id)
      const userTransformed: IUserTransformed = this.userService.transformer(user)
      return await this.userToPayload(userTransformed)
    } catch (error) {
      throw new UnauthorizedException();
    }
  }


  getUserFromRequest() {
    return this.request.user
  }

}
