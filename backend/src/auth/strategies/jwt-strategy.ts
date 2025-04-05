import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET
    })
  }
  async validate(payload: any){
    console.log('trying to validate JWT');
      // const user = await this.authService.validateUser({email, password});
      // console.log('validateuser in local strategy called')
      // if(!user) throw new UnauthorizedException('Invalid credentials');
      // return user;
  }
}