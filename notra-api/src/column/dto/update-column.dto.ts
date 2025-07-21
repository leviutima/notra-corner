import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateColumnDto {
  // @ApiProperty({})
  // @IsInt()
  // id: number

  @ApiProperty({})
  @IsString()
  title: string
}