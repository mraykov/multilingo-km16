import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../database/entities/user.entity';
import { ChangeLanguagesDTO } from '../../models/languages/change-language.dto';
import { ShowUserDTO } from '../../models/users/show-user.dto';

describe('Users Controller', () => {
  let controller: UsersController;

  const usersService = {
    getAllUsers() { /* empty */ },
    getUserDetails() { /* empty */ },
    getUsersArticles() { /* empty */ },
    createUser() { /* empty */ },
    changePassword() { /* empty */ },
    changeLanguage() { /* empty */ },
    updateUser() { /* empty */ },
    deleteUser() { /* empty */ },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should call usersService.getAllUsers once', async () => {
      // Arrange
      const spyUsersService = jest.spyOn(usersService, 'getAllUsers')
      .mockImplementation(async () => 'getAllUsers');

      // Act
      await controller.getAllUsers();

      // Assert
      expect(spyUsersService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const spyUsersService = jest.spyOn(usersService, 'getAllUsers')
      .mockImplementation(async () => 'getAllUsers');

      // Act
      const response = await controller.getAllUsers();

      // Assert
      expect(response).toBe('getAllUsers');
    });
  });

  describe('getUserDetails', () => {
    it('should call usersService.getUserDetails once with correct arguments', async () => {
      // Arrange
      const mockId = 1;
      const spyUsersService = jest.spyOn(usersService, 'getUserDetails')
      .mockImplementation(async () => 'getUserDetails');

      // Act
      await controller.getUserDetails(mockId);

      // Assert
      expect(spyUsersService).toBeCalledWith(mockId);
      expect(spyUsersService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockId = 1;
      const spyUsersService = jest.spyOn(usersService, 'getUserDetails')
      .mockImplementation(async () => 'getUserDetails');

      // Act
      const response = await controller.getUserDetails(mockId);

      // Assert
      expect(response).toBe('getUserDetails');
    });
  });

  describe('getUsersArticles', () => {
    it('should call usersService.getUsersArticles once with correct arguments', async () => {
      // Arrange
      const mockId = 1;
      const mockLanguage = 'en';
      const spyUsersService = jest.spyOn(usersService, 'getUsersArticles')
      .mockImplementation(async () => 'getUsersArticles');

      // Act
      await controller.getUsersArticles(mockId, mockLanguage);

      // Assert
      expect(spyUsersService).toBeCalledWith(mockId, mockLanguage);
      expect(spyUsersService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockId = 1;
      const mockLanguage = 'en';
      const spyUsersService = jest.spyOn(usersService, 'getUsersArticles')
      .mockImplementation(async () => 'getUsersArticles');

      // Act
      const response = await controller.getUsersArticles(mockId, mockLanguage);

      // Assert
      expect(response).toBe('getUsersArticles');
    });
  });

  describe('createUser', () => {
    it('should call usersService.createUser once with correct arguments', async () => {
      // Arrange
      const mockUser = new User();
      const spyUsersService = jest.spyOn(usersService, 'createUser')
      .mockImplementation(async () => 'createUser');

      // Act
      await controller.createUser(mockUser);

      // Assert
      expect(spyUsersService).toBeCalledWith(mockUser);
      expect(spyUsersService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockUser = new User();
      const spyUsersService = jest.spyOn(usersService, 'createUser')
      .mockImplementation(async () => 'createUser');

      // Act
      const response = await controller.createUser(mockUser);

      // Assert
      expect(response).toBe('createUser');
    });
  });

  describe('changePassword', () => {
    it('should call usersService.changePassword once with correct arguments', async () => {
      // Arrange
      const mockId = 4;
      const mockPassword = 'Pass';
      const spyUsersService = jest.spyOn(usersService, 'changePassword')
      .mockImplementation(async () => 'changePassword');

      // Act
      await controller.changePassword(mockId, mockPassword);

      // Assert
      expect(spyUsersService).toBeCalledWith(mockId, mockPassword);
      expect(spyUsersService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockId = 4;
      const mockPassword = 'Pass';
      const spyUsersService = jest.spyOn(usersService, 'changePassword')
      .mockImplementation(async () => 'changePassword');

      // Act
      const response = await controller.changePassword(mockId, mockPassword);

      // Assert
      expect(response).toBe('changePassword');
    });
  });

  describe('changeLanguage', () => {
    it('should call usersService.changeLanguage once with correct arguments', async () => {
      // Arrange
      const mockId = 4;
      const mockBody = new ChangeLanguagesDTO();
      const spyUsersService = jest.spyOn(usersService, 'changeLanguage')
      .mockImplementation(async () => 'changeLanguage');

      // Act
      await controller.changeLanguage(mockId, mockBody);

      // Assert
      expect(spyUsersService).toBeCalledWith(mockId, mockBody);
      expect(spyUsersService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockId = 4;
      const mockBody = new ChangeLanguagesDTO();
      const spyUsersService = jest.spyOn(usersService, 'changeLanguage')
      .mockImplementation(async () => 'changeLanguage');

      // Act
      const response = await controller.changeLanguage(mockId, mockBody);

      // Assert
      expect(response).toBe('changeLanguage');
    });
  });

  describe('updateUser', () => {
    it('should call usersService.updateUser once with correct arguments', async () => {
      // Arrange
      const mockId = 5;
      const mockBody = new ShowUserDTO();
      const mockUserLogged = new User();
      const spyUsersService = jest.spyOn(usersService, 'updateUser')
      .mockImplementation(async () => 'updateUser');

      // Act
      await controller.updateUser(mockId, mockBody, mockUserLogged);

      // Assert
      expect(spyUsersService).toBeCalledWith(mockId, mockBody, mockUserLogged);
      expect(spyUsersService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockId = 5;
      const mockBody = new ShowUserDTO();
      const mockUserLogged = new User();
      const spyUsersService = jest.spyOn(usersService, 'updateUser')
      .mockImplementation(async () => 'updateUser');

      // Act
      const response = await controller.updateUser(mockId, mockBody, mockUserLogged);

      // Assert
      expect(response).toBe('updateUser');
    });
  });

  describe('deleteUser', () => {
    it('should call usersService.deleteUser once with correct arguments', async () => {
      // Arrange
      const mockId = 6;
      const spyUsersService = jest.spyOn(usersService, 'deleteUser')
      .mockImplementation(async () => 'deleteUser');

      // Act
      await controller.deleteUser(mockId);

      // Assert
      expect(spyUsersService).toBeCalledWith(mockId);
      expect(spyUsersService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockId = 6;
      const spyUsersService = jest.spyOn(usersService, 'deleteUser')
      .mockImplementation(async () => 'deleteUser');

      // Act
      const response = await controller.deleteUser(mockId);

      // Assert
      expect(response).toBe('deleteUser');
    });
  });
});
