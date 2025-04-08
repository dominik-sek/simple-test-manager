import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestParameterService } from './test-parameter.service';
import { CreateTestParameterDto } from './dto/create-test-parameter.dto';
import { UpdateTestParameterDto } from './dto/update-test-parameter.dto';

@Controller('test-parameter')
export class TestParameterController {
  constructor(private readonly testParameterService: TestParameterService) {}

  @Post()
  create(@Body() createTestParameterDto: CreateTestParameterDto) {
    return this.testParameterService.create(createTestParameterDto);
  }

  @Get()
  findAll() {
    return this.testParameterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testParameterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestParameterDto: UpdateTestParameterDto) {
    return this.testParameterService.update(+id, updateTestParameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testParameterService.remove(+id);
  }
}
