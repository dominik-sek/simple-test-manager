import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    let user = {...createUserDto};
    user.password = await bcrypt.hash(user.password, saltOrRounds);

    throw new Error('Method not implemented');
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService._findOneWithPasswordByEmail(loginUserDto.email)
    const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password)
    if(!passwordMatch) throw new UnauthorizedException('Username or password is incorrect');

    const {password, ...results} = user;
    return results
  }

  async login (user: any){
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    }
    const now = new Date().toISOString();
    await this.userService.update(user.id, {last_login: now})
    return this.jwtService.sign(payload)
  }


  logout(id: number) {
    throw new Error('Method not implemented');
  }
}
