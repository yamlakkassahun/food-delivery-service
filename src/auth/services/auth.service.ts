import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dto/create-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async signToken(id: number, name: string): Promise<{ token: string }> {
    const payload = { sub: id, username: name };
    return { token: await this.jwtService.signAsync(payload) };
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.UserRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(
        'Please check your login Email credential',
      );
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      throw new UnauthorizedException(
        'Please check your login password credential',
      );
    }

    return this.signToken(user.id, user.name);
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const { name, email, phoneNumber, password, address, role } = createUserDto;
    const userEmail = await this.UserRepository.findOne({
      where: { email },
    });

    if (userEmail) {
      throw new ConflictException(
        'User already exists with this email or phone',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.UserRepository.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      role,
    });

    const user = await this.UserRepository.save(newUser);
    return this.signToken(user.id, user.name);
  }
}
