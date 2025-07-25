import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class PatchTitleChecklistDto{

  @ApiProperty({description: "title"})
  @IsString()
  title: string
}