import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;

  const token = { access_token: 'mockedTokenValue' };

  const mockAuthService = {
    signUp: jest.fn().mockResolvedValueOnce(token),
    signIn: jest.fn().mockResolvedValueOnce(token),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('should register a new user', async () => {
      const signUpDto = {
        name: 'Yamlak Kassahun',
        email: 'yamlak.k@gmail.com',
        phoneNumber: '+251922929903',
        password: 'hashedPassword',
        address: 'Addis Abeba, Ethiopia',
        role: 'admin',
      };

      const result = await authController.signUp(signUpDto);
      expect(authService.signUp).toHaveBeenCalled();
      expect(result).toEqual(token);
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const loginDto = {
        email: 'yamlak.k@gmail.com',
        password: '12345678',
      };

      const result = await authController.signIn(loginDto);
      expect(authService.signIn).toHaveBeenCalled();
      expect(result).toEqual(token);
    });
  });
});
