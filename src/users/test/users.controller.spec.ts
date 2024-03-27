import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let usersService: UsersService;
  let usersController: UsersController;

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

  const mockUsersService = {
    create: jest.fn().mockResolvedValueOnce(mockUser),
    findAll: jest.fn().mockResolvedValueOnce([mockUser]),
    findOne: jest.fn().mockResolvedValueOnce(mockUser),
    update: jest.fn().mockResolvedValueOnce(mockUser),
    remove: jest.fn().mockResolvedValueOnce(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Yamlak Kassahun',
        email: 'yamlak.k@gmail.com',
        phoneNumber: '+251922929903',
        password: 'hashedPassword',
        address: 'Addis Abeba, Ethiopia',
        role: 'admin',
      };

      const result = await usersController.create(createUserDto);
      expect(usersService.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should find and return all user', async () => {
      const result = await usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should find user by id and return user', async () => {
      const id = '1';
      const result = await usersController.findOne(id);
      expect(usersService.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    const id = '1';
    const updateUserDto: UpdateUserDto = {
      name: 'Yamlak Kassahun',
      email: 'yamlak.k@gmail.com',
      phoneNumber: '+251922929903',
      password: 'hashedPassword',
      address: 'Addis Abeba, Ethiopia',
      role: 'admin',
    };

    it('should find user by id and return update user', async () => {
      const result = await usersController.update(id, updateUserDto);
      expect(usersService.update).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    const id = '1';
    it('it should find user by id and remove it', async () => {
      const result = await usersController.remove(id);
      expect(usersService.remove).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });
});
