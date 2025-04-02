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
    return this.prisma.user.create({
      data:{
        ...createUserDto,
        created_at: now
      },
      omit:{
        password: true
      }
    })
  }

  async findAll() {
    return this.prisma.user.findMany({
      omit: {
        password: true
      }
    })
  }

  async findOne(id: number) {
    //todo: return user projects etc..?
    if(!id) throw new BadRequestException('User ID is required');
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: id
      },
      omit:{
        password:true,
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if(!id) throw new BadRequestException('User ID is required');

    return  this.prisma.user.update({
      where:{
        id: id
      },
      omit:{
        password:true,
      },
      data:updateUserDto
    })

  }
  async deactivate(id: number) {
    if(!id) throw new BadRequestException(`User ID is required`);

    return this.prisma.user.update({
      where:{
        id:id,
        is_active: true
      },
      data:{
        is_active: false
      },
      omit:{
        password:true,
      }
    })
  }

}
