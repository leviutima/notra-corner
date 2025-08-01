import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class PatchFinishedDto {

  @ApiProperty()
  @IsBoolean()
  finished: boolean
}