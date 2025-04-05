import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    let user = {...createUserDto};
    user.password = await bcrypt.hash(user.password, saltOrRounds);

    throw new Error('Method not implemented');

  }

  async validateUser({ email, password }: LoginUserDto) {

    const user = await this.userService._findOneWithPasswordByEmail(email)
    if(!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = bcrypt.compare(password, user.password)
    if(!passwordMatch) throw new UnauthorizedException('Username or password is incorrect');

    return this.jwtService.sign({payload: user.id})
    //return jwt with role?

    //return this.authService.findAll();
  }

  logout(id: number) {
    throw new Error('Method not implemented');
  }
}
