import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let model: Repository<User>;
  let jwtService: JwtService;

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

  const token = { access_token: 'mockedTokenValue' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET, // Provide a valid secret key for testing
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    model = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(AuthService).toBeDefined();
  });

  describe('Sign-JWT', () => {
    it('should sign a JWT token', async () => {
      const user = { id: 1, name: 'user' };

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token.access_token);

      const signedToken = await authService.signToken(user.id, user.name);

      expect(signedToken).toEqual(token);
    });
  });

  describe('Sign-Up', () => {
    const signUpDto = {
      name: 'Yamlak Kassahun',
      email: 'yamlak.k@gmail.com',
      phoneNumber: '+251922929903',
      password: '12345678',
      address: 'Addis Abeba, Ethiopia',
      role: 'admin',
    };

    it('should throw duplicate email entered', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockUser);

      await expect(authService.signUp(signUpDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should register the new user', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

      jest.spyOn(model, 'create').mockReturnValue(mockUser);

      jest.spyOn(model, 'save').mockResolvedValue(mockUser);

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token.access_token);

      const result = await authService.signUp(signUpDto);
      expect(result).toEqual(token);
    });
  });

  describe('logIn', () => {
    const loginDto = {
      email: 'yamlak.k@gmail.com',
      password: '12345678',
    };

    it('should throw invalid email error', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

      expect(authService.signIn(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw invalid password error', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      expect(authService.signIn(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should login user and return the token', async () => {
      // this find the user
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUser);

      //this tests the password compar method
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      // this tests will generate the sign
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token.access_token);

      const signedToken = await authService.signIn(loginDto);

      expect(signedToken).toEqual(token);
    });
  });
});
