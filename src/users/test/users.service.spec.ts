import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let userService: UsersService;
  let model: Repository<User>;

  const mockUser: User = {
    id: 1,
    name: 'Yamlak Kassahun',
    email: 'yamlak.k@gmail.com',
    phoneNumber: '+251922929903',
    password: 'hashedPassword',
    address: 'Addis Abeba, Ethiopia',
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const signUpDto = {
    name: 'Yamlak Kassahun',
    email: 'yamlak.k@gmail.com',
    phoneNumber: '+251922929903',
    password: '12345678',
    address: 'Addis Abeba, Ethiopia',
    role: 'admin',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    model = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should register the new user', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValue(null);

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

    jest.spyOn(model, 'create').mockReturnValue(mockUser);

    jest.spyOn(model, 'save').mockResolvedValue(mockUser);

    const result = await userService.create(signUpDto);

    expect(result).toEqual(mockUser);
  });
});
