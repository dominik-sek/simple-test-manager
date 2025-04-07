import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestProjectDto } from './dto/create-test-project.dto';
import { UpdateTestProjectDto } from './dto/update-test-project.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestProjectDto: CreateTestProjectDto, userId: number) {
    //need to get user id, then create inside joined table i think?
    const project = await this.prisma.test_project.create({
      data: createTestProjectDto,
    })
    await this.prisma.test_project_user.create({
      data:{
        user_id:userId,
        test_project_id: project.id
      }
    })
    return project
  }

  async findAll(id: number) {
    return this.prisma.test_project_user.findMany({
      where:{
        user_id: id
      },
      select:{
        test_project: true
      }
    })
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
