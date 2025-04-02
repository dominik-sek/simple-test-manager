import { IsOptional, IsString, IsEnum, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { test_status } from '@prisma/client';

export class CreateTestCaseDto {
    @ApiPropertyOptional({ example: 'Login Test' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'Covers positive login scenario' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ enum: test_status })
    @IsOptional()
    @IsEnum(test_status)
    status?: test_status;

    @ApiPropertyOptional({
        description: 'Test parameters with possible values',
        example: {
            username: ['admin', 'guest'],
            password: ['1234', 'abcd'],
            rememberMe: [true, false],
        },
    })
    @IsOptional()
    @IsObject()
    parameters?: Record<string, any[]>;
}
