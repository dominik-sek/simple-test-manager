import { Injectable } from '@nestjs/common';
import { CreateTestSuiteDto } from './dto/create-test-suite.dto';
import { UpdateTestSuiteDto } from './dto/update-test-suite.dto';

@Injectable()
export class TestSuiteService {
  create(createTestSuiteDto: CreateTestSuiteDto) {
    return 'This action adds a new testSuite';
  }

  findAll() {
    return `This action returns all testSuite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testSuite`;
  }

  update(id: number, updateTestSuiteDto: UpdateTestSuiteDto) {
    return `This action updates a #${id} testSuite`;
  }

  remove(id: number) {
    return `This action removes a #${id} testSuite`;
  }
}
