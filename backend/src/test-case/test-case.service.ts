import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestCaseService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestCaseDto: CreateTestCaseDto) {
    return this.prisma.test_case.create({
      data: createTestCaseDto
    })
  }

  findAll() {
    return this.prisma.test_case.findMany()
  }

  findOne(id: number) {
    if(!id) throw new NotFoundException('test case not found');
    return this.prisma.test_case.findUniqueOrThrow({
      where:{
        id: id
      }
    })
  }

  update(id: number, updateTestCaseDto: UpdateTestCaseDto) {
    return this.prisma.test_case.update({
      where:{
        id:id
      },
      data: updateTestCaseDto
    })
  }

  remove(id: number) {
    if(!id) throw new NotFoundException('test case not found');
    return this.prisma.test_case.delete({
      where:{
        id:id
      }
    })
  }
}
