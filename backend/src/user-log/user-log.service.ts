import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserLogService {
  constructor(private readonly prisma: PrismaService) {}

  async log(userId: number, action: string, result: string, metadata?: any){
    await this.prisma.user_log.create({
      data: {
        user_id: userId,
        action: action,
        result: result,
        metadata: metadata
      }
    })
  }
}
