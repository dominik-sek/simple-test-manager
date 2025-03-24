import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestSuiteService } from './test-suite.service';
import { CreateTestSuiteDto } from './dto/create-test-suite.dto';
import { UpdateTestSuiteDto } from './dto/update-test-suite.dto';

@Controller('test-suite')
export class TestSuiteController {
  constructor(private readonly testSuiteService: TestSuiteService) {}

  @Post()
  create(@Body() createTestSuiteDto: CreateTestSuiteDto) {
    return this.testSuiteService.create(createTestSuiteDto);
  }

  @Get()
  findAll() {
    return this.testSuiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSuiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestSuiteDto: UpdateTestSuiteDto) {
    return this.testSuiteService.update(+id, updateTestSuiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSuiteService.remove(+id);
  }
}
