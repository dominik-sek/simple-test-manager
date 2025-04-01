import { Injectable } from '@nestjs/common';
import { CreateTestCollectionDto } from './dto/create-test-collection.dto';
import { UpdateTestCollectionDto } from './dto/update-test-collection.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestCollectionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTestCollectionDto: CreateTestCollectionDto) {
    return 'This action adds a new testCollection';
  }

  findAll() {
    return `This action returns all testCollection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testCollection`;
  }

  update(id: number, updateTestCollectionDto: UpdateTestCollectionDto) {
    return `This action updates a #${id} testCollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} testCollection`;
  }
}
