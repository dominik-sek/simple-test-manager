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
  async countCasesByStatus(){
    const [total, grouped] = await Promise.all([
      this.prisma.test_case.count(),
      this.prisma.test_case.groupBy({
        by: ['status'],
        _count: {
          _all: true
        }
      })
    ])
    return{
      total,
      grouped: grouped.map(group=>({
        status: group.status,
        count: group._count._all,
      }))
    }

  }

  findAll() {
    return this.prisma.test_case.findMany({
      include:{
        parameters: true
      }
    })
  }

  findOne(id: number) {
    if(!id) throw new NotFoundException('test case not found');
    return this.prisma.test_case.findUniqueOrThrow({
      where:{
        id: id
      },
      include:{
        test_step:true,
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
