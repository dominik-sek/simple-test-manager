import { IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiPropertyOptional({ example: 'johndoe' })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiPropertyOptional({ example: 'securepassword123' })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiPropertyOptional({ example: 'tester' })
    @IsOptional()
    @IsString()
    role?: string;

    @ApiPropertyOptional({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    full_name?: string;

    @ApiPropertyOptional({ example: 'john@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
