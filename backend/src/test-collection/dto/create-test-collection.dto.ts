import { IsOptional, IsString } from 'class-validator';

export class CreateTestCollectionDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
