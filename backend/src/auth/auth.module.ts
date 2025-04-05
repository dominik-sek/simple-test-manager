import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports:[
    JwtModule.register({
      secret: 'jwtSecret',
      signOptions:{
        expiresIn: '60s'
      }
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
