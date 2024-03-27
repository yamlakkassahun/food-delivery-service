import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {}
export class LoginUserDto {
  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty({ message: 'Field email must be added' })
  @IsString()
  email: string;
  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty({ message: 'Field password must be added' })
  @IsString()
  password: string;
}
