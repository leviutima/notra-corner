import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class PatchFinishedChecklist {
  @ApiProperty({description: 'finalização da checklist'})
  @IsBoolean()
  finished: boolean
}