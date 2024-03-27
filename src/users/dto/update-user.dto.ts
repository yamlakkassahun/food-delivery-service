import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty({ message: 'Field name must be added' })
  name: string;
  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty({ message: 'Field email must be added' })
  @IsString()
  email: string;
  @ApiProperty({ type: String, description: 'phoneNumber' })
  @IsNotEmpty({ message: 'Field phoneNumber must be added' })
  @IsString()
  phoneNumber: string;
  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty({ message: 'Field password must be added' })
  @IsString()
  password: string;
  @ApiProperty({ type: String, description: 'address' })
  @IsOptional()
  @IsString()
  address: string;
  @ApiProperty({ type: String, description: 'role' })
  @IsNotEmpty({ message: 'Field role must be added' })
  @IsString()
  role: string;
}
