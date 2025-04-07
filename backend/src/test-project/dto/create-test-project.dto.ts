import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTestProjectDto {
    @ApiProperty({ example: 'Mobile App' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: 'This project handles mobile test flows.' })
    @IsOptional()
    @IsString()
    description?: string;

}
