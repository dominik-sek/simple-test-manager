import { Injectable } from '@nestjs/common';
import { CreateTestProjectDto } from './dto/create-test-project.dto';
import { UpdateTestProjectDto } from './dto/update-test-project.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestProjectService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestProjectDto: CreateTestProjectDto) {
    return 'This action adds a new testProject';
  }

  findAll() {
    return `This action returns all testProject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testProject`;
  }

  update(id: number, updateTestProjectDto: UpdateTestProjectDto) {
    return `This action updates a #${id} testProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} testProject`;
  }
}
