import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateActivitieDto {
  @ApiProperty({description: "titulo da atividade"})
  @IsString()
  title: string

  @ApiProperty({description: "descricao da atividade"})
  @IsString()
  description: string

}