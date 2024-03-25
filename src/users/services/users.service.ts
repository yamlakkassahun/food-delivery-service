import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, phoneNumber, password } = createUserDto;
    const userEmail = await this.findByEmail(email);

    if (userEmail) {
      throw new BadRequestException('User already exists with this email');
    }

    const userPhone = await this.findByPhone(phoneNumber);

    if (userPhone) {
      throw new BadRequestException(
        'User already exists with this phone number',
      );
    }
    const newUser = this.UserRepository.create({
      password: await bcrypt.hash(password, 10),
      ...createUserDto,
    });

    return await this.UserRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.UserRepository.findOne({ where: { id } });
  }

  async findByPhone(phoneNumber: string): Promise<User | undefined> {
    return await this.UserRepository.findOne({ where: { phoneNumber } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.UserRepository.findOne({ where: { email } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = this.findOne(id);
    if (user) throw new BadRequestException('User dose not exist');
    await this.UserRepository.update(id, updateUserDto);
    return await this.UserRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.UserRepository.delete(id);
  }
}
