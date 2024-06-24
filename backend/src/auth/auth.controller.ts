import { Body, Controller, Get, Headers, Post, UseFilters } from '@nestjs/common';
import { IUsersignInDTO } from './dto/user.signin.dto';
import { AuthService } from './auth.service';
import { AppExceptionFilter } from 'src/common-infra/exception.filter';

@Controller('auth')
// @UseFilters(new AppExceptionFilter())
export class AuthController {

    constructor(private authService: AuthService){}

    @Post()
    async signIn(@Body() userDTO: IUsersignInDTO){
        return this.authService.signIn(userDTO.email, userDTO.password)
    }

    @Get('refresh')
    async refreshUser(@Headers('Authorization') authorization: string ){
        const [type, token] = authorization?.split(' ') ?? []
        return await this.authService.getUserFromRefreshToken(token)

    }
}
