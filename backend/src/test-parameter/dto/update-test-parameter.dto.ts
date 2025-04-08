import { PartialType } from '@nestjs/swagger';
import { CreateTestParameterDto } from './create-test-parameter.dto';

export class UpdateTestParameterDto extends PartialType(CreateTestParameterDto) {}
