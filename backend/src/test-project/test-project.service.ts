import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestProjectDto } from './dto/create-test-project.dto';
import { UpdateTestProjectDto } from './dto/update-test-project.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestProjectDto: CreateTestProjectDto) {
    //need to get user id, then create inside joined table i think?
    return this.prisma.test_project.create({
      data: createTestProjectDto
    })
  }

  async findAll() {
    return this.prisma.test_project.findMany()
  }

  async findOne(id: number) {
    if(!id) throw new BadRequestException('Project ID is required');
    return this.prisma.test_project.findUniqueOrThrow({
      where:{
        id: id
      },
      include:{
        test_project_user:true,
        test_project_collection: true
      }
    })
  }

  async update(id: number, updateTestProjectDto: UpdateTestProjectDto) {
    if(!id) throw new BadRequestException('Project ID is required');
    return this.prisma.test_project.update({
      where:{
        id: id
      },
      data: updateTestProjectDto
    })
  }

  async remove(id: number) {
    if(!id) throw new BadRequestException('Project ID is required');
    return this.prisma.test_project.delete({
      where:{
        id: id
      }
    })
  }
}
