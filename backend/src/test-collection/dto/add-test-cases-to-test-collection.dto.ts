import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class AddTestCasesToCollectionDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  testCaseIds: number[];
}