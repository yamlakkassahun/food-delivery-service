import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// src/controllers/user.controller.spec.ts

// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UserService } from '../services/user.service';

// describe('UserController', () => {
//   let controller: UserController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [UserService],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   // Write more test cases for each CRUD operation
// });

// describe('UserService', () => {
//   let userService: UserService;
//   let userRepository: Repository<User>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(User),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     userService = module.get<UserService>(UserService);
//     userRepository = module.get<Repository<User>>(getRepositoryToken(User));
//   });

//   it('should return an array of users', async () => {
//     const users: User[] = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];
//     jest.spyOn(userRepository, 'find').mockResolvedValue(users);

//     expect(await userService.findAll()).toEqual(users);
//   });
// });

// it('should create a new user', async () => {
//   const newUser: User = { name: 'Bob', email: 'bob@example.com' };
//   jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

//   expect(await userService.create(newUser)).toEqual(newUser);
// });

// it('should update an existing user', async () => {
//   const updatedUser: User = { id: 1, name: 'Charlie', email: 'charlie@example.com' };
//   jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
//   jest.spyOn(userRepository, 'findOne').mockResolvedValue(updatedUser);

//   expect(await userService.update(1, updatedUser)).toEqual(updatedUser);
// });

// it('should delete an existing user', async () => {
//   jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

//   await userService.delete(1);
//   expect(userRepository.delete).toHaveBeenCalledWith(1);
// });
