import { Controller, Post, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {Request} from 'express';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    if(!req.user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(req.user)
  }
}
