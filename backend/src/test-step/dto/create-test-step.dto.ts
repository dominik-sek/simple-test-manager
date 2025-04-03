import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTestStepDto {
    @ApiProperty({example: 1})
    @IsInt()
    test_case_id: number;

    @ApiPropertyOptional({example: 'do this and that'})
    @IsOptional()
    @IsString()
    step_actions?: string;

    @ApiPropertyOptional({example: 'should do this and that'})
    @IsOptional()
    @IsString()
    expected_results?: string;
}
