import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../auth.service';
import User from 'src/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthenticationService){
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string): Promise<User> {
        return this.authService.getAuthUser(email, password);
    }
}