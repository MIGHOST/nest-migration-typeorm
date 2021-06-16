import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { CreateUserDto } from './../user/dto/createUser.dto';
import { AuthenticationService } from './auth.service';
import { Body, Controller, Post, HttpCode, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import RequestWithUser from './interface/requestWithUser.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthenticationService
    ){}

    @Post("register")
    async register(@Body()registerData: CreateUserDto){
        return this.authService.register(registerData)
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
      const {user} = request;
      const cookie = this.authService.getCookieWithJwtToken(user.id);
      response.setHeader('Set-Cookie', cookie);
      user.password = undefined;
      return response.send(user);
    }
}
