import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestProjectService } from './test-project.service';
import { CreateTestProjectDto } from './dto/create-test-project.dto';
import { UpdateTestProjectDto } from './dto/update-test-project.dto';

@Controller('test-project')
export class TestProjectController {
  constructor(private readonly testProjectService: TestProjectService) {}

  @Post()
  create(@Body() createTestProjectDto: CreateTestProjectDto) {
    return this.testProjectService.create(createTestProjectDto);
  }

  @Get()
  findAll() {
    return this.testProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testProjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestProjectDto: UpdateTestProjectDto) {
    return this.testProjectService.update(+id, updateTestProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testProjectService.remove(+id);
  }
}
