import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestRunDto } from './dto/create-test-run.dto';
import { UpdateTestRunDto } from './dto/update-test-run.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestRunService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestRunDto: CreateTestRunDto) {
    return this.prisma.test_run.create({
      data: createTestRunDto
    })
  }

  findAll() {
    return this.prisma.test_run.findMany()
  }

  findOne(id: number) {
    if(!id) throw new NotFoundException("test run not found");
    return this.prisma.test_run.findUniqueOrThrow({
      where:{
        id:id
      },
      include:{
        test_case_run: true
      }
    })
  }

  update(id: number, updateTestRunDto: UpdateTestRunDto) {
    if(!id) throw new NotFoundException("test run not found");
    return this.prisma.test_run.update({
      where:{
        id:id
      },
      data:updateTestRunDto
    })
  }

  remove(id: number) {
    if(!id) throw new NotFoundException("test run not found");
    return this.prisma.test_run.delete({
      where:{
        id:id
      }
    })
  }
}
