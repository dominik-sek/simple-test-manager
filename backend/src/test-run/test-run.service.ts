import { Injectable } from '@nestjs/common';
import { CreateTestRunDto } from './dto/create-test-run.dto';
import { UpdateTestRunDto } from './dto/update-test-run.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestRunService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestRunDto: CreateTestRunDto) {
    return 'This action adds a new testRun';
  }

  findAll() {
    return `This action returns all testRun`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testRun`;
  }

  update(id: number, updateTestRunDto: UpdateTestRunDto) {
    return `This action updates a #${id} testRun`;
  }

  remove(id: number) {
    return `This action removes a #${id} testRun`;
  }
}
