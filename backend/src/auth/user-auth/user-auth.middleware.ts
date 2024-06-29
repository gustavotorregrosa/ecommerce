import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';
import { IUserTransformed } from 'src/@domain/user/service.interface';

export interface IRequestWithUser extends Request {
  user?: IUserTransformed
}

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {

  constructor(private authService: AuthService) { }

  async use(request: IRequestWithUser, response: Response, next: NextFunction) {
    try {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        const {id, email, name} = await this.authService.getUserFromToken(token)
        request.user = {
          id, email, name
        }
        next()
    } catch (error) {
        throw new UnauthorizedException()
    }

  }
}
