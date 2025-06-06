import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

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
    console.log('running valudate user inside uservice')
    const user = await this.userService._findOneWithPasswordByUsername(loginUserDto.username)
    if(!user) throw new UnauthorizedException('Invalid credentials');
    const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password)
    if(!user.is_active) throw new UnauthorizedException('User is disabled');
    if(!passwordMatch) throw new UnauthorizedException('Username or password is incorrect');

    const {password, ...results} = user;
    return results
  }

  async getById(id: number) {
    return this.userService.findOne(id)
  }

  async login (user: any){
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      full_name: user.full_name,
    }
    const now = new Date().toISOString();

    await this.userService.update(user.id, {last_login: now})

    return {
      access_token: this.jwtService.sign(payload)
    }

  }

  logout(user:any) {
    console.log('hit logout route')
  }
}
