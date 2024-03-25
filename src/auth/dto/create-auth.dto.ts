import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {}
export class LoginUserDto {
  @IsNotEmpty({ message: 'Field email must be added' })
  @IsString()
  email: string;
  @IsNotEmpty({ message: 'Field password must be added' })
  @IsString()
  password: string;
}
