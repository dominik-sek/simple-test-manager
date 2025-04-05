import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: "jwtSecret"
    })
  }
  async validate(payload: any){
      // const user = await this.authService.validateUser({email, password});
      // console.log('validateuser in local strategy called')
      // if(!user) throw new UnauthorizedException('Invalid credentials');
      // return user;
  }
}