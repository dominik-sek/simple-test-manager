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
      },
      include:{
        test_collection_test_case:true,
        test_project_collection: true,
      }
    })
  }
  addCases(collectionId: number, testCaseIds: number[]) {
    const data = testCaseIds.map((test_case_id)=>({
      test_collection_id: collectionId,
      test_case_id: test_case_id,
    }))

    return this.prisma.test_collection_test_case.createMany({
      data,
      skipDuplicates: true
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
