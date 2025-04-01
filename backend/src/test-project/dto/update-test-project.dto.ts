import { PartialType } from '@nestjs/mapped-types';
import { CreateTestProjectDto } from './create-test-project.dto';

export class UpdateTestProjectDto extends PartialType(CreateTestProjectDto) {}
