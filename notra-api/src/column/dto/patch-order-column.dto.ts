import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class PatchOrderColumnDto {
  @ApiProperty()
  @IsInt()
  id: number

  @ApiProperty() 
  @IsInt()
  order: number
}