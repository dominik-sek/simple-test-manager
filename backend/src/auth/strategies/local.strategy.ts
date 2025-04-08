import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
    console.log('authservice?', !!authService)
  }
  async validate(username: string, password: string){
    console.log('validating')
      const user = await this.authService.validateUser({username, password});
      if(!user) throw new UnauthorizedException('Invalid credentials');
      return user;
  }
}