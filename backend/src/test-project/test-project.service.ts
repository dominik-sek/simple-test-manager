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
    const project = await this.prisma.test_project.findUnique({
      where:{
        id: id
      }
    })
    if(!project) throw new NotFoundException('Project not found');
    return project
  }

  async update(id: number, updateTestProjectDto: UpdateTestProjectDto) {
    if(!id) throw new BadRequestException('Project ID is required');
    const updatedProject = await this.prisma.test_project.update({
      where:{
        id: id
      },
      data: updateTestProjectDto
    })
    if(!updatedProject) throw new NotFoundException('Project not found');
    return updatedProject
  }

  async remove(id: number) {

    if(!id) throw new BadRequestException('Project ID is required'); //todo: handle prisma errors
    // const projectToDelete = await this.prisma.test_project.findUnique({
    //   where:{
    //     id:id
    //   }
    // })
    // if(!projectToDelete) throw new NotFoundException('Project not found');

    return this.prisma.test_project.delete({
      where:{
        id: id
      }
    })
  }
}
