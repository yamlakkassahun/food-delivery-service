import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  name: string;
  @IsNotEmpty({ message: 'Field email must be added' })
  @IsString()
  email: string;
  @IsNotEmpty({ message: 'Field phoneNumber must be added' })
  @IsString()
  phoneNumber: string;
  @IsNotEmpty({ message: 'Field password must be added' })
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsNotEmpty({ message: 'Field role must be added' })
  @IsString()
  role: string;
}
