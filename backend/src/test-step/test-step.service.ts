import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestStepDto } from './dto/create-test-step.dto';
import { UpdateTestStepDto } from './dto/update-test-step.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestStepService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestStepDto: CreateTestStepDto) {
    return this.prisma.test_step.create({
      data: createTestStepDto
    })
  }

  findAll() {
    return this.prisma.test_step.findMany()
  }

  findOne(id: number) {
    if(!id) throw new NotFoundException('test step does not exist');
    return this.prisma.test_step.findUniqueOrThrow({
      where:{
        id:id
      }
    })
  }

  update(id: number, updateTestStepDto: UpdateTestStepDto) {
    if(!id) throw new NotFoundException('test step does not exist');
    return this.prisma.test_step.update({
      where:{
        id:id
      },
      data:updateTestStepDto
    })
  }

  remove(id: number) {
    if(!id) throw new NotFoundException('test step does not exist');
    return this.prisma.test_step.delete({
      where:{
        id:id
      }
    })
  }
}
