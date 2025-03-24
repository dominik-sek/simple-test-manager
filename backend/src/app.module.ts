import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { TestCaseModule } from './test-case/test-case.module';
import { TestSuiteModule } from './test-suite/test-suite.module';

@Module({
  imports: [ConfigModule.forRoot(), TestCaseModule, TestSuiteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
