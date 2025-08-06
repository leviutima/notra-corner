import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PatchPasswordUserDto {
  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsString()
  password: string
}