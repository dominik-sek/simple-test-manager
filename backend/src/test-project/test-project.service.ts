import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestProjectDto } from './dto/create-test-project.dto';
import { UpdateTestProjectDto } from './dto/update-test-project.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestProjectDto: CreateTestProjectDto, userId: number) {
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
    //if admin, return all
    ///todo: just return all, save user_id as created_by
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id: id
    //   },
    //   select:{
    //     role: true
    //   }
    // })
    // if(user.role == 'admin'){
      // this.prisma.test_project.findMany({
      //   select:{
      //     id: true,
      //     name: true,
      //     description: true,
      //     test_project_user: true,
      //     test_project_collection: {
      //       include: {
      //         test_collection: true
      //       }
      //     }
      //   }

      // })
    
    const testProjectsRaw = await this.prisma.test_project.findMany({
      select: {
        id: true, //need keys to map on frontend
        name: true,
        description: true,
        test_project_collection: {
          select: {
            test_collection: true
          }
        }
      },
    })
    const testProjects = testProjectsRaw.map((project) => (
      {
        id: project.id,
        name: project.description,
        description: project.description,
        test_collections: project.test_project_collection.map((collection)=> collection.test_collection)
      }
    ))
    return testProjects
    
    // }

    // return this.prisma.test_project_user.findMany({
    //   where:{
    //     user_id: id
    //   },
    //   select:{
    //     test_project: true
    //   }
    // })
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
