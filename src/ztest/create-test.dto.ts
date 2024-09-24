import { IsNotEmpty } from 'class-validator';
export class CreateTestDto {

  @IsNotEmpty()
  readonly field1: string;

  @IsNotEmpty()
  readonly field2: string;
}
