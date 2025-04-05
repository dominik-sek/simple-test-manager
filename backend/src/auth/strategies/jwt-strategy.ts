import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as process from 'node:process';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET
    })
  }
  async validate(payload: JwtPayload){
    const user = await this.authService.getById(payload.sub)
    if(!user) throw new UnauthorizedException('User not found');
    return payload;
  }
}