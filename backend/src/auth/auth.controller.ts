import { Controller, Post, UseGuards, Req, UnauthorizedException, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {Request} from 'express';
import { Public } from 'src/decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    console.log('LOGIN ATTEMPT:', req.user); // see if this is hit

    if(!req.user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(req.user)
  }

  @Public()
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    console.log('LOGOUT ATTEMPT:', req.user);
    if(req.user) return null;
    //todo: add token invalidation
    return this.authService.logout(req.user)
  }
}
