import { Injectable } from '@nestjs/common';
import { CreateTestParameterDto } from './dto/create-test-parameter.dto';
import { UpdateTestParameterDto } from './dto/update-test-parameter.dto';

@Injectable()
export class TestParameterService {
  create(createTestParameterDto: CreateTestParameterDto) {
    return 'This action adds a new testParameter';
  }

  findAll() {
    return `This action returns all testParameter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testParameter`;
  }

  update(id: number, updateTestParameterDto: UpdateTestParameterDto) {
    return `This action updates a #${id} testParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} testParameter`;
  }
}
