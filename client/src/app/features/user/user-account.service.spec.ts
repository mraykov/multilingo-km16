import { UserAccountService } from './user-account.service';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DOMAIN } from '../../config/domain.config';

describe('UserAccountService', () => {
  const http = {
    get() {},
    post() {},
    put() {},
    patch() {},
    delete() {}
  };
  let getService: () => UserAccountService;

  beforeEach(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [UserAccountService, HttpClient]
    }).overrideProvider(HttpClient, { useValue: http });

    getService = () => TestBed.get(UserAccountService);
  });
  it('should be created', () => {
    const service: UserAccountService = getService();
    expect(service).toBeTruthy();
  });
  describe('getUserArticles() method', () => {
    it('Should call get() method once with the correct arguments', () => {
      // Arrange
      const id = 1;
      const language = 'en';
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/users/${id}/articles?language=${language}`;
      const spy = jest.spyOn(http, 'get');

      // Act
      const service: UserAccountService = getService();
      service.getUserArticles(id, language);

      // Assert
      expect(spy).toBeCalledWith(mockArgument);
      expect(spy).toBeCalledTimes(1);
    });
  });
  describe('getUserDetails() method', () => {
    it('Should call get() method once with the correct arguments', () => {
      // Arrange
      const id = 1;
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/users/${id}`;
      const spy = jest.spyOn(http, 'get');

      // Act
      const service: UserAccountService = getService();
      service.getUserDetails(id);

      // Assert
      expect(spy).toBeCalledWith(mockArgument);
      expect(spy).toBeCalledTimes(1);
    });
  });
  describe('changePassword() method', () => {
    it('Should call patch() method once with the correct arguments', () => {
      // Arrange
      const id = 1;
      const password = {};
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/users/${id}/password`;
      const spy = jest.spyOn(http, 'patch');

      // Act
      const service: UserAccountService = getService();
      service.changePassword(id, password);

      // Assert
      expect(spy).toBeCalledWith(mockArgument, password);
      expect(spy).toBeCalledTimes(1);
    });
  });
  describe('changeLanguage() method', () => {
    it('Should call patch() method once with the correct arguments', () => {
      // Arrange
      const user = {id: 1}
      const language = {};
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/users/${user.id}/language`;
      const spy = jest.spyOn(http, 'patch');

      // Act
      const service: UserAccountService = getService();
      service.changeLanguage(user, language);

      // Assert
      expect(spy).toBeCalledWith(mockArgument, language);
      expect(spy).toBeCalledTimes(1);
    });
  });
});
