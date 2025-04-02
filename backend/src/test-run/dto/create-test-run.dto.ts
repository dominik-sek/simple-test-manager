import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateTestRunDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsDateString()
    started_at?: string;

    @IsOptional()
    @IsDateString()
    finished_at?: string;
}
