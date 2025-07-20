import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateColumnDto {

  @ApiProperty({description: "titulo da coluna"})
  @IsString()
  title: string

  @ApiProperty({ description: "ID do usuário dono da coluna" })
  @IsString()
  userId: string
}