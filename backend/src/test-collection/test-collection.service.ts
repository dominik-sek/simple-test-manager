import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestCollectionDto } from './dto/create-test-collection.dto';
import { UpdateTestCollectionDto } from './dto/update-test-collection.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestCollectionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestCollectionDto: CreateTestCollectionDto) {
    return this.prisma.test_collection.create({
      data: createTestCollectionDto
    })
  }

  findAll() {
    return this.prisma.test_collection.findMany()
  }

  findOne(id: number) {
    if(!id) throw new NotFoundException('test collection not found');
    return this.prisma.test_collection.findUniqueOrThrow({
      where: {
        id: id
      }
    })
  }

  update(id: number, updateTestCollectionDto: UpdateTestCollectionDto) {
    return this.prisma.test_collection.update({
      where:{
        id:id
      },
      data: updateTestCollectionDto
    })
  }

  remove(id: number) {
    if(!id) throw new NotFoundException('test collection not found');
    return this.prisma.test_collection.delete({
      where:{
        id:id
      }
    })
  }
}
