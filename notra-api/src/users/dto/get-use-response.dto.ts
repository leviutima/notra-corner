// user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'generated/prisma';

export class GetUserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: String, format: 'date' })
  birthDate: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.birthDate = user.birthDate;
  }
}
