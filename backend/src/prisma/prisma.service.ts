import {Injectable, OnModuleInit, Logger, OnModuleDestroy} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    logger = new Logger(PrismaService.name);

    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level:'query',
                }
            ]
        });
    }
    async onModuleInit() {
        await this.$connect();

        // @ts-ignore
        this.$on('query' as any, async (e: any) => {
            this.logger.debug(`(${e.duration}ms) ${e.query}`);
            if (e.duration > 50) {
                this.logger.warn(`Slow query (${e.duration}ms): ${e.query}`);
            }
        });
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}
