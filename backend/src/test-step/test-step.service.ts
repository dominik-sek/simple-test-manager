import { Injectable } from '@nestjs/common';
import { CreateTestStepDto } from './dto/create-test-step.dto';
import { UpdateTestStepDto } from './dto/update-test-step.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestStepService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestStepDto: CreateTestStepDto) {
    return 'This action adds a new testStep';
  }

  findAll() {
    return `This action returns all testStep`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testStep`;
  }

  update(id: number, updateTestStepDto: UpdateTestStepDto) {
    return `This action updates a #${id} testStep`;
  }

  remove(id: number) {
    return `This action removes a #${id} testStep`;
  }
}
