import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './../user/dto/createUser.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from './interface/tokenPayload.interface';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...registrationData,
        password: hashedPassword
      });
      return createdUser;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async getAuthUser(email: string, receivedPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(receivedPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
  private async verifyPassword(receivedPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      receivedPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException(`Email or password doesn't exist`, HttpStatus.BAD_REQUEST)
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/;
    Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;


  }
}