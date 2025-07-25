import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt } from "class-validator";

export class PatchFinishedChecklist {
  @IsInt()
  id: number

  @ApiProperty({description: 'finalização da checklist'})
  @IsBoolean()
  finished: boolean
}