import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTestCollectionDto {

    @IsOptional()
    project_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}
