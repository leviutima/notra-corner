import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt } from "class-validator";

export class PatchFinishedChecklistDto {
  @ApiProperty({description: 'finalização da checklist'})
  @IsBoolean()
  finished: boolean
}