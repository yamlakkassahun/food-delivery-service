import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
  description: string;
  @IsString()
  @IsOptional()
  address: string;
  @IsNotEmpty({ message: 'Field role must be added' })
  @IsString()
  role: string;
}
