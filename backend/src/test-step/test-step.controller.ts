import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestStepService } from './test-step.service';
import { CreateTestStepDto } from './dto/create-test-step.dto';
import { UpdateTestStepDto } from './dto/update-test-step.dto';

@Controller('test-step')
export class TestStepController {
  constructor(private readonly testStepService: TestStepService) {}

  @Post()
  create(@Body() createTestStepDto: CreateTestStepDto) {
    return this.testStepService.create(createTestStepDto);
  }

  @Get()
  findAll() {
    return this.testStepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testStepService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestStepDto: UpdateTestStepDto) {
    return this.testStepService.update(+id, updateTestStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testStepService.remove(+id);
  }
}
