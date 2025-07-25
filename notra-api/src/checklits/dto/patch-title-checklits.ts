import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateChecklistDto {
  @ApiProperty({description: "title"})
  @IsString()
  title: string
}