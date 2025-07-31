import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";

export class CreateCheckListDto {
  @ApiProperty({description: 'título do checklist'})
  @IsString()
  title: string

  @ApiProperty({description: 'confirmação do checklist'})
  @IsBoolean()
  finished: boolean

  @ApiProperty({description: 'id da atividade relacionada'})
  @IsString()
  activitieId: string

  @ApiProperty()
  @IsInt()
  order: number

  @ApiProperty()
  @IsDate()
  createdAt: Date
}