import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTestStepDto {
    @IsInt()
    test_case_id: number;

    @IsOptional()
    @IsString()
    step_actions?: string;

    @IsOptional()
    @IsString()
    expected_results?: string;
}
