import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TestProjectService } from './test-project.service';
import { CreateTestProjectDto } from './dto/create-test-project.dto';
import { UpdateTestProjectDto } from './dto/update-test-project.dto';
import { Request } from 'express'
import { user } from '@prisma/client';
import { test_project_collection } from '@prisma/client';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('test-project')
export class TestProjectController {
  constructor(private readonly testProjectService: TestProjectService) {}

  //@Roles(['admin'])
  @Post()
  create(@Body() createTestProjectDto: CreateTestProjectDto, @Req() req: Request) {
    console.log(req.user)
    const user = req.user as JwtPayload
    return this.testProjectService.create(createTestProjectDto, user.sub);
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as JwtPayload
    return this.testProjectService.findAll(user.sub);
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
