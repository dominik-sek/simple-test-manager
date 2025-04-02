import { IsOptional, IsString, IsEmail, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiPropertyOptional({ example: 'johndoe' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiPropertyOptional({ example: 'securepassword123' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional({ example: 'tester' })
    @IsString()
    @IsNotEmpty()
    role: string;

    @ApiPropertyOptional({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    full_name?: string;

    @ApiPropertyOptional({ example: 'john@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
