import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const now = new Date().toISOString();
    const user = await this.prisma.user.create({
      data:{
        ...createUserDto,
        created_at: now
      }
    })
    if(!user) {
      throw new BadRequestException(``);
    }

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      omit: {
        password: true
      }
    })
    return users;
  }

  async findOne(id: number) {
    //todo: return user projects etc..?
    if(!id){
      console.log('no id')
      throw new BadRequestException('User ID is required');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      omit:{
        password:true,
      }
    })
    if(!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if(!id){
      throw new BadRequestException('User ID is required');
    }
    const user = await this.prisma.user.update({
      where:{
        id: id
      },
      data:updateUserDto
    })
    if(!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  async deactivate(id: number) {
    if(!id) {
      throw new BadRequestException(`User ID is required`);
    }
    const user = await this.prisma.user.findUnique({
      where:{
        id:id
      }
    })
    if(!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if(!user.is_active){
      throw new ConflictException('User is not active');
    }

    const userEdit = await this.prisma.user.update({
      where:{
        id:id
      },
      data:{
        is_active: false
      },
      select:{
        is_active: true
      }
    })

    return userEdit
  }
  remove(id: number) {
    // this.prisma.user.delete({
    //   where: {
    //     id: id
    //   }
    // })
  }
}
