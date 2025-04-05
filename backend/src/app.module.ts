import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { TestProjectModule } from './test-project/test-project.module';
import { TestCollectionModule } from './test-collection/test-collection.module';
import { TestCaseModule } from './test-case/test-case.module';
import { TestStepModule } from './test-step/test-step.module';
import { TestRunModule } from './test-run/test-run.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TestProjectModule,
    TestCollectionModule,
    TestCaseModule,
    TestStepModule,
    TestRunModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true
    })
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

  ],
})
export class AppModule {}
