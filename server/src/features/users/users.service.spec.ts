import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { ArticlesService } from '../articles/articles.service';
import { Role } from '../../database/entities/role.entity';
import { JwtService } from '@nestjs/jwt';
import { Article } from '../../database/entities/article.entity';
import { ArticleVersion } from '../../database/entities/article-version.entity';
import { LingosSystemError } from '../../common/exceptions/lingo-system.error';
import { RegisterUserDTO } from '../../models/users/register-user.dto';
import { RoleTypes } from '../../common/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { ShowUserDTO } from '../../models/users/show-user.dto';
import { ChangeLanguagesDTO } from '../../models/languages/change-language.dto';
import { TokenUserDTO } from '../../models/users/token-user.dto';
import { Language } from '../../database/entities/languages.entity';

describe('UsersService', () => {
  let service: UsersService;

  let jwtService;
  let articlesService;
  let usersRepository;
  let rolesRepository;
  let articlesRepository;
  let articleVersionRepository;

  beforeEach(async () => {

    jwtService = {
      signAsync() { /* empty */ },
    };

    articleVersionRepository = {
      find() { /* empty */ },
      findOne() { /* empty */ },
      create() { /* empty */ },
      save() { /* empty */ },
      remove() { /* empty */ },
    };
    articlesRepository = {
      find() { /* empty */ },
      findOne() { /* empty */ },
      create() { /* empty */ },
      save() { /* empty */ },
      remove() { /* empty */ },
    };

    articlesService = {
      getUsersArticles() { /* empty */ },
    };

    rolesRepository = {
      find() { /* empty */ },
      findOne() { /* empty */ },
      create() { /* empty */ },
      save() { /* empty */ },
    };

    usersRepository = {
      find() { /* empty */ },
      findOne() { /* empty */ },
      create() { /* empty */ },
      save() { /* empty */ },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: rolesRepository,
        },
        {
          provide: getRepositoryToken(ArticleVersion),
          useValue: articleVersionRepository,
        },
        {
          provide: getRepositoryToken(Article),
          useValue: articlesRepository,
        },
        {
          provide: ArticlesService,
          useValue: articlesService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsersArticles()', () => {
    it('should call articlesService.getUsersArticles with correct arguments', async () => {
      // Arrange
      const mockId = 1;
      const mockLanguage = 'en';

      const spyArticlesServiceGetUsersArticles = jest.spyOn(articlesService, 'getUsersArticles')
      .mockImplementation(() => Promise.resolve('getUsersArticles'));

      // Act
      await service.getUsersArticles(mockId, mockLanguage);

      // Assert
      expect(spyArticlesServiceGetUsersArticles).toBeCalledWith(mockId, mockLanguage);
      expect(spyArticlesServiceGetUsersArticles).toBeCalledTimes(1);
    });
  });

  describe('getUserDetails()', () => {
    it('should call usersRepository.findOne with correct arguments', async () => {
      // Arrange
      const mockId = 1;

      const spyUsersRepo = jest.spyOn(usersRepository, 'findOne').mockImplementation(() => Promise.resolve('getUserDetails'));

      // Act
      await service.getUserDetails(mockId);

      // Assert
      expect(spyUsersRepo).toBeCalledWith({
        where: { id: mockId, deleted: false },
      });
      expect(spyUsersRepo).toBeCalledTimes(1);
    });

    it('should throw error', () => {
      // Arrange
      const mockId = 1;

      const spyUsersRepo = jest.spyOn(usersRepository, 'findOne').mockImplementation(() => Promise.resolve(null));

      // Act
      const testService = service.getUserDetails(mockId);

      // Assert
      testService.catch(reason => {
        expect(reason).toBeInstanceOf(LingosSystemError);
      });
    });

    it('should return correct argument', () => {
      // Arrange
      const mockId = 1;

      const spyUsersRepo = jest.spyOn(usersRepository, 'findOne').mockImplementation(() => Promise.resolve('getUserDetails'));

      // Act
      const testService = service.getUserDetails(mockId);

      // Assert
      testService.then(value => {
        expect(value).toBe('getUserDetails');
      });
    });
  });

  describe('getAllUsers', () => {
    it('should call usersRepository.find once', async () => {
      // Arrange
      const spyUsersRepo = jest.spyOn(usersRepository, 'find').mockImplementation(() => Promise.resolve('getAllUsers'));

      // Act
      await service.getAllUsers();

      // Assert
      expect(spyUsersRepo).toBeCalled();
      expect(spyUsersRepo).toBeCalledTimes(1);
    });

    it('should return correct argument', () => {
      // Arrange
      const spyUsersRepo = jest.spyOn(usersRepository, 'find').mockImplementation(() => Promise.resolve('getAllUsers'));

      // Act
      const testSerivece = service.getAllUsers();

      // Assert
      testSerivece.then(value => {
        expect(value).toBe('getAllUsers');
      });
    });
  });

  describe('createUser', () => {
    it('should call usersRepository.findOne once with correct arguments', async () => {
      // Arrange
      const username = 'createUser';
      const user = new RegisterUserDTO();
      user.password = 'old';
      user.username = username;
      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));
      const spyUserRepoCreate = jest.spyOn(usersRepository, 'create')
      .mockImplementation(() => ({role: null}));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.createUser(user);

      // Assert
      expect(spyUserRepoFindOne).toBeCalledWith({ username });
      expect(spyUserRepoFindOne).toBeCalledTimes(1);
    });

    it('should throw error', () => {
      // Arrange
      const username = 'createUser';
      const user = new RegisterUserDTO();
      user.password = 'old';
      user.username = username;
      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve('User'));
      const spyUserRepoCreate = jest.spyOn(usersRepository, 'create')
      .mockImplementation(() => user);
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));

      // Act & Assert
      service.createUser(user).catch(reason => {
        expect(reason).toBeInstanceOf(LingosSystemError);
      });
    });

    it('should call rolesRepository.findOne once with correct arguments', async () => {
      // Arrange
      const username = 'createUser';
      const user = new RegisterUserDTO();
      user.password = 'old';
      user.username = username;
      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(false));
      const spyUserRepoCreate = jest.spyOn(usersRepository, 'create')
      .mockImplementation(() => user);
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyRoleRepoFindOne = jest.spyOn(rolesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.createUser(user);

      // Assert
      expect(spyRoleRepoFindOne).toBeCalledWith({
        roleName: RoleTypes.Contributor,
      });
      expect(spyRoleRepoFindOne).toBeCalledTimes(1);
    });

    it('should call usersRepository.create once', async () => {
      // Arrange
      const username = 'createUser';
      const user = new RegisterUserDTO();
      user.password = 'old';
      user.username = username;
      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(false));
      const spyUserRepoCreate = jest.spyOn(usersRepository, 'create')
      .mockImplementation(() => user);
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyRoleRepoFindOne = jest.spyOn(rolesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.createUser(user);

      // Assert
      expect(spyUserRepoCreate).toBeCalled();
      expect(spyUserRepoCreate).toBeCalledTimes(1);
    });

    it('should call usersRepository.save once with correct arguments', async () => {
      // Arrange
      const username = 'createUser';
      const user = new RegisterUserDTO();
      user.password = 'old';
      user.username = username;
      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(false));
      const spyUserRepoCreate = jest.spyOn(usersRepository, 'create')
      .mockImplementation(() => user);
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyRoleRepoFindOne = jest.spyOn(rolesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.createUser(user);

      // Assert
      expect(spyUserRepoSave).toBeCalledWith(user);
      expect(spyUserRepoSave).toBeCalledTimes(1);
    });
  });

  describe('changePassword', () => {
    it('should call usersRepository.findOne once with correct arguments', async () => {
      // Arrange
      const mockId = 1;
      const mockPassword = { oldPassword: '1234', newPassword: '1234'};
      const user = new User();
      user.password = await bcrypt.hash('1234', 10);
      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(user));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(user));

      // Act
      await service.changePassword(mockId, mockPassword);

      // Assert
      expect(spyUserRepoFindOne).toBeCalledWith({ where: { id: mockId } });
      expect(spyUserRepoFindOne).toBeCalledTimes(1);
    });

    it('should throw error when passowords do not match', async () => {
      // Arrange
      const mockId = 1;
      const mockPassword = { oldPassword: '1234', newPassword: '1234'};
      const user = new User();
      user.password = await bcrypt.hash('12345', 10);
      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(user));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(user));

      // Act
      const testSerivice = service.changePassword(mockId, mockPassword);

      // Assert
      testSerivice.catch(reason => {
        expect(reason).toBeInstanceOf(LingosSystemError);
      });
    });

    it('should call usersRepository.save once with correct arguments', async () => {
      // Arrange
      const mockId = 1;
      const mockPassword = { oldPassword: '1234', newPassword: '1234'};
      const user = new User();
      user.password = await bcrypt.hash('1234', 10);
      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(user));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(user));

      // Act
      await service.changePassword(mockId, mockPassword);

      // Assert
      expect(spyUserRepoSave).toBeCalledWith(user);
      expect(spyUserRepoSave).toBeCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should throw error if the logged user is not Admin', async () => {
      // Arrange
      const mockId = 1;
      const mockBody = new ShowUserDTO();
      const mockUserLogged = new User();
      const role = new Role();
      role.roleName = RoleTypes.Contributor;
      mockUserLogged.role = role;
      mockBody.role = role;

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockUserLogged));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyRolesRepoFindOne = jest.spyOn(rolesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(role));

      // Act & Assert
      service.updateUser(mockId, mockBody, mockUserLogged).catch(reason => {
        expect(reason).toBeInstanceOf(LingosSystemError);
      });
    });

    it('should call rolesRepository.findOne once with correct arguments', async () => {
      // Arrange
      const mockId = 1;
      const mockBody = new ShowUserDTO();
      const mockUserLogged = new User();
      const role = new Role();
      role.roleName = RoleTypes.Admin;
      mockUserLogged.role = role;
      mockBody.role = role;

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockUserLogged));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyRolesRepoFindOne = jest.spyOn(rolesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(role));

      // Act
      await service.updateUser(mockId, mockBody, mockUserLogged);

      // Assert
      expect(spyRolesRepoFindOne).toBeCalledWith({
        where: { roleName: mockBody.role.roleName },
      });
      expect(spyRolesRepoFindOne).toBeCalledTimes(1);
    });

    it('should call usersRepository.findOne once with correct arguments', async () => {
      // Arrange
      const mockId = 1;
      const mockBody = new ShowUserDTO();
      const mockUserLogged = new User();
      const role = new Role();
      role.roleName = RoleTypes.Admin;
      mockUserLogged.role = role;
      mockBody.role = role;

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockUserLogged));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyRolesRepoFindOne = jest.spyOn(rolesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(role));

      // Act
      await service.updateUser(mockId, mockBody, mockUserLogged);

      // Assert
      expect(spyUserRepoFindOne).toBeCalledWith({ where: { id: mockId } });
      expect(spyUserRepoFindOne).toBeCalledTimes(1);
    });

    it('should call usersRepository.save once with correct arguments', async () => {
      // Arrange
      const mockId = 1;
      const mockBody = new ShowUserDTO();
      const mockUserLogged = new User();
      const role = new Role();
      role.roleName = RoleTypes.Admin;
      mockUserLogged.role = role;
      mockBody.role = role;

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockUserLogged));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyRolesRepoFindOne = jest.spyOn(rolesRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(role));

      // Act
      await service.updateUser(mockId, mockBody, mockUserLogged);

      // Assert
      expect(spyUserRepoSave).toBeCalledWith(mockUserLogged);
      expect(spyUserRepoSave).toBeCalledTimes(1);
    });
  });

  describe('changeLanguage()', () => {
    it('should call usersRepository.findOne once with correct arguments', async () => {
      // Arrange
      const mockId = 5;
      const role = new Role();
      const mockBody = new ChangeLanguagesDTO();
      const mockFoundUser = new User();
      mockFoundUser.role = role;
      const mockPayLoad = new TokenUserDTO();
      const returnType = { ...mockBody, token: null };

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFoundUser));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyJWTService = jest.spyOn(jwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.changeLanguage(mockId, mockBody);

      // Assert
      expect(spyUserRepoFindOne).toBeCalledWith({ where: { id: mockId } });
      expect(spyUserRepoFindOne).toBeCalledTimes(1);
    });

    it('should call usersRepository.save once with correct arguments', async () => {
      // Arrange
      const mockId = 5;
      const role = new Role();
      const mockBody = new ChangeLanguagesDTO();
      const mockFoundUser = new User();
      mockFoundUser.role = role;
      mockFoundUser.preferredLanguage = mockBody;
      const mockPayLoad = new TokenUserDTO();
      const returnType = { ...mockBody, token: null };

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFoundUser));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyJWTService = jest.spyOn(jwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.changeLanguage(mockId, mockBody);

      // Assert
      expect(spyUserRepoSave).toBeCalledWith(mockFoundUser);
      expect(spyUserRepoSave).toBeCalledTimes(1);
    });

    it('should call jwtService.signAsync once with correct arguments', async () => {
      // Arrange
      const mockId = 5;
      const role = new Role();
      const mockBody = new ChangeLanguagesDTO();
      const mockFoundUser = new User();
      mockFoundUser.role = role;
      const mockPayLoad = new TokenUserDTO();
      const returnType = { ...mockBody, token: null };

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFoundUser));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyJWTService = jest.spyOn(jwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.changeLanguage(mockId, mockBody);

      // Assert
      expect(spyJWTService).toBeCalledWith(mockPayLoad);
      expect(spyJWTService).toBeCalledTimes(1);
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockId = 5;
      const role = new Role();
      const mockBody = new ChangeLanguagesDTO();
      const mockFoundUser = new User();
      mockFoundUser.role = role;
      const mockPayLoad = new TokenUserDTO();
      const returnType = { ...mockBody, token: null };

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFoundUser));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyJWTService = jest.spyOn(jwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve(null));

      // Act & Assert
      service.changeLanguage(mockId, mockBody).then(value => {
        expect(value).toEqual(returnType);
      });
    });
  });

  describe('deleteUser()', () => {
    it('should call usersRepository.findOne with correct arguments', async () => {
      const mockId = 6;
      const mockFound = new User();
      const mockArticlesVersion = new ArticleVersion();
      const mockArticle = new Article();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFound));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticleRepoFind = jest.spyOn(articlesRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticle));
      const spyArticleRepoRemove = jest.spyOn(articlesRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticlesVersionRepoFind = jest.spyOn(articleVersionRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticlesVersion));
      const spyArticlesVersionRepoRemove = jest.spyOn(articleVersionRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.deleteUser(mockId);

      // Assert
      expect(spyUserRepoFindOne).toBeCalledWith({ where: { id: mockId } });
      expect(spyUserRepoFindOne).toBeCalledTimes(1);
    });

    it('should throw error if there are not user', async () => {
      const mockId = 6;
      const mockFound = new User();
      const mockArticlesVersion = new ArticleVersion();
      const mockArticle = new Article();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticleRepoFind = jest.spyOn(articlesRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticle));
      const spyArticleRepoRemove = jest.spyOn(articlesRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticlesVersionRepoFind = jest.spyOn(articleVersionRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticlesVersion));
      const spyArticlesVersionRepoRemove = jest.spyOn(articleVersionRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));

      // Act & Assert
      service.deleteUser(mockId).catch(reason => {
        expect(reason).toBeInstanceOf(LingosSystemError);
      });
    });

    it('should call articleVersionRepository.find with correct arguments', async () => {
      const mockId = 6;
      const mockFound = new User();
      const mockArticlesVersion = new ArticleVersion();
      const mockArticle = new Article();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFound));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticleRepoFind = jest.spyOn(articlesRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticle));
      const spyArticleRepoRemove = jest.spyOn(articlesRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticlesVersionRepoFind = jest.spyOn(articleVersionRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticlesVersion));
      const spyArticlesVersionRepoRemove = jest.spyOn(articleVersionRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.deleteUser(mockId);

      // Assert
      expect(spyArticlesVersionRepoFind).toBeCalledWith({ where: { author: mockFound.id } });
      expect(spyArticlesVersionRepoFind).toBeCalledTimes(1);
    });

    it('should call articleRepository.find with correct arguments', async () => {
      const mockId = 6;
      const mockFound = new User();
      const mockArticlesVersion = new ArticleVersion();
      const mockArticle = new Article();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFound));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticleRepoFind = jest.spyOn(articlesRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticle));
      const spyArticleRepoRemove = jest.spyOn(articlesRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticlesVersionRepoFind = jest.spyOn(articleVersionRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticlesVersion));
      const spyArticlesVersionRepoRemove = jest.spyOn(articleVersionRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.deleteUser(mockId);

      // Assert
      expect(spyArticleRepoFind).toBeCalledWith({ where: { author: mockFound.id } });
      expect(spyArticleRepoFind).toBeCalledTimes(1);
    });

    it('should call articleVersionRepository.remove with correct arguments', async () => {
      const mockId = 6;
      const mockFound = new User();
      const mockArticlesVersion = new ArticleVersion();
      const mockArticle = new Article();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFound));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticleRepoFind = jest.spyOn(articlesRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticle));
      const spyArticleRepoRemove = jest.spyOn(articlesRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticlesVersionRepoFind = jest.spyOn(articleVersionRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticlesVersion));
      const spyArticlesVersionRepoRemove = jest.spyOn(articleVersionRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.deleteUser(mockId);

      // Assert
      expect(spyArticlesVersionRepoRemove).toBeCalledWith(mockArticlesVersion);
      expect(spyArticlesVersionRepoRemove).toBeCalledTimes(1);
    });

    it('should call articleRepository.remove with correct arguments', async () => {
      const mockId = 6;
      const mockFound = new User();
      const mockArticlesVersion = new ArticleVersion();
      const mockArticle = new Article();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFound));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticleRepoFind = jest.spyOn(articlesRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticle));
      const spyArticleRepoRemove = jest.spyOn(articlesRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticlesVersionRepoFind = jest.spyOn(articleVersionRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticlesVersion));
      const spyArticlesVersionRepoRemove = jest.spyOn(articleVersionRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.deleteUser(mockId);

      // Assert
      expect(spyArticleRepoRemove).toBeCalledWith(mockArticle);
      expect(spyArticleRepoRemove).toBeCalledTimes(1);
    });

    it('should call usersRepository.save with correct arguments', async () => {
      const mockId = 6;
      const mockFound = new User();
      mockFound.deleted = true;
      const mockArticlesVersion = new ArticleVersion();
      const mockArticle = new Article();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFound));
      const spyUserRepoSave = jest.spyOn(usersRepository, 'save')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticleRepoFind = jest.spyOn(articlesRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticle));
      const spyArticleRepoRemove = jest.spyOn(articlesRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));
      const spyArticlesVersionRepoFind = jest.spyOn(articleVersionRepository, 'find')
      .mockImplementation(() => Promise.resolve(mockArticlesVersion));
      const spyArticlesVersionRepoRemove = jest.spyOn(articleVersionRepository, 'remove')
      .mockImplementation(() => Promise.resolve(null));

      // Act
      await service.deleteUser(mockId);

      // Assert
      expect(spyUserRepoSave).toBeCalledWith(mockFound);
      expect(spyUserRepoSave).toBeCalledTimes(1);
    });
  });

  describe('findUserByUsername()', () => {
    it('should call usersRepository.findOne once with correct arguments', async () => {
      // Arrange
      const mockUsernameSearch = 'findUserByUsername';
      const mockFoundUser = new User();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFoundUser));

      // Act
      await service.findUserByUsername(mockUsernameSearch);

      // Assert
      expect(spyUserRepoFindOne).toBeCalledWith({
        username: mockUsernameSearch,
      });
      expect(spyUserRepoFindOne).toBeCalledTimes(1);
    });

    it('should throw error if the user is not found', async () => {
      // Arrange
      const mockUsernameSearch = 'findUserByUsername';
      const mockFoundUser = new User();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));

      // Act & Assert
      service.findUserByUsername(mockUsernameSearch).catch(reason => {
        expect(reason).toBeInstanceOf(LingosSystemError);
      });
    });

    it('should return the correct value', async () => {
      // Arrange
      const mockUsernameSearch = 'findUserByUsername';
      const mockFoundUser = new User();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFoundUser));

      // Act & Assert
      service.findUserByUsername(mockUsernameSearch).then(value => {
        expect(value).toBe(mockFoundUser);
      });
    });
  });

  describe('findUser()', () => {
    it('should call usersRepository.findOne once with correct arguments', async () => {
      const mockFoundUser = new User();
      mockFoundUser.username = 'some';
      const language = new Language();
      language.language = 'en';
      mockFoundUser.preferredLanguage = language;

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFoundUser));

      // Act
      await service.findUser(mockFoundUser);

      // Assert
      expect(spyUserRepoFindOne).toBeCalledWith({where: {username: mockFoundUser.username },
        relations: ['preferredLanguage'],
      });
      expect(spyUserRepoFindOne).toBeCalledTimes(1);
    });

    it('should throw error if the user is not found', async () => {
      const mockFoundUser = new User();
      const language = new Language();
      language.language = 'en';
      mockFoundUser.preferredLanguage = language;

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(null));

      // Act & Assert
      await service.findUser(mockFoundUser).catch(reason => {
        expect(reason).toBeInstanceOf(LingosSystemError);
      });
    });

    it('should change foundUser.preferredLanguage to { language: null }', async () => {
      const mockFoundUser = new User();
      const language = new Language();

      const spyUserRepoFindOne = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(() => Promise.resolve(mockFoundUser));

      // Act & Assert
      service.findUser(mockFoundUser).then(value => {
        expect(value.preferredLanguage).toEqual({ language: null });
      });
    });
  });

  describe('validateUserPassword()', () => {
    it('should throw error if the password does not match with the user.password', async () => {
      // Arrange
      const mockPasswordToCheck = '12345';
      const mockUser = new User();
      mockUser.password = await bcrypt.hash('1234', 10);

      // Act & Assert
      service.validateUserPassword(mockPasswordToCheck, mockUser).catch(reason => {
        expect(reason).toBeInstanceOf(LingosSystemError);
      });
    });

    it('should return true if the password and the user.password match', async () => {
      // Arrange
      const mockPasswordToCheck = '1234';
      const mockUser = new User();
      mockUser.password = await bcrypt.hash('1234', 10);

      // Act & Assert
      service.validateUserPassword(mockPasswordToCheck, mockUser).then(value => {
        expect(value).toBe(true);
      });
    });
  });
});
