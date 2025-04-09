import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTestCollectionDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}
