import { ApiProperty } from "@nestjs/swagger";
import {IsInt, IsString} from "class-validator";

export class CreateColumnDto {
  @ApiProperty({description: "id da coluna"})
  @IsInt()
  id: number

  @ApiProperty({description: "titulo da coluna"})
  @IsString()
  title: string
}