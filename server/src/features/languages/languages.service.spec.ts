import { TestingModule, Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { LanguagesService } from './languages.service';
import { Language } from '../../database/entities/languages.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Translations } from '../../database/entities/translations.entity';
import { User } from '../../database/entities/user.entity';
import { TranslationsService } from '../translations/translations.service';
import { LingosSystemError } from '../../common/exceptions/lingo-system.error';
import { AddLanguageDTO } from '../../models/languages/add-language.dto';

describe('Language service', () => {
  let service: LanguagesService;
  let languageRepo: any;
  let translationRepo: any;
  let userRepo: any;
  let translationService: any;

  beforeEach(async () => {
    languageRepo = {
      find() {
        /* empty */
      },
      findOne() {
        /* empty */
      },
      create() {
        /* empty */
      },
      save() {
        /* empty */
      },
    };
    translationRepo = {
      find() {
        /* empty */
      },
    };
    userRepo = {
      find() {
        /* empty */
      },
      save() {
        /* empty */
      },
    };
    translationService = {
      TranslateToSingleLanguage() {
        /* empty */
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        LanguagesService,
        {
          provide: TranslationsService,
          useValue: translationService,
        },
        {
          provide: getRepositoryToken(Language),
          useValue: languageRepo,
        },
        {
          provide: getRepositoryToken(Translations),
          useValue: translationRepo,
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepo,
        },
      ],
    }).compile();
    service = module.get<LanguagesService>(LanguagesService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getActiveLanguages() method', () => {
    it('Should call repository find() method and return correct value if provided query for retrieving all supported languages', async () => {
      // Arrange
      const language = 'en';
      const allSupportedLang = true;
      const all = false;
      const active = false;
      const spy = jest.spyOn(languageRepo, 'find').mockReturnValue('test');
      // Act
      const response = await service.getActiveLanguages(
        language,
        all,
        allSupportedLang,
        active,
      );
      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(response).toBe('test');
      spy.mockClear();
    });
    it('Should call repository find() method and return correct value if provided query for retrieving only active languages', async () => {
      // Arrange
      const language = 'en';
      const allSupportedLang = false;
      const all = false;
      const active = true;
      const spy = jest.spyOn(languageRepo, 'find').mockReturnValue('test');
      // Act
      const response = await service.getActiveLanguages(
        language,
        all,
        allSupportedLang,
        active,
      );
      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(response).toBe('test');
      spy.mockClear();
    });
    it('Should call repository find() method and return correct value if provided query for retrieving a single language', async () => {
      // Arrange
      const language = 'en';
      const allSupportedLang = false;
      const all = false;
      const active = false;
      const spy = jest.spyOn(languageRepo, 'findOne').mockReturnValue('test');
      // Act
      const response = await service.getActiveLanguages(
        language,
        all,
        allSupportedLang,
        active,
      );
      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ language });
      expect(response).toBe('test');
      spy.mockClear();
    });
    it('Throw an error if looking for a non-existing language', async () => {
      // Arrange
      const language = 'ensd';
      const allSupportedLang = false;
      const all = false;
      const active = false;
      const lang: Language = {
        id: 1,
        language: 'some',
        isActive: true,
        isDeleted: true,
      };
      const spy = jest
        .spyOn(languageRepo, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));
      // Act
      const result = service.getActiveLanguages(
        language,
        all,
        allSupportedLang,
        active,
      );
      // Assert
      expect(result).rejects.toThrow(LingosSystemError);
      spy.mockClear();
    });
  });
  describe('addLanguage() method', () => {
    it('Should call languageRepository create() method once', async () => {
      // Arrange
      const fakeLanguage: AddLanguageDTO = {
        language: 'English',
      };
      const fakeCode = { language: 'en' };

      const expectedLanguage: Language = {
        id: 1,
        language: 'en',
        isActive: true,
        isDeleted: false,
      };

      const spy = jest
        .spyOn(languageRepo, 'create')
        .mockReturnValue(Promise.resolve(expectedLanguage));

      // Act
      await service.addLanguage(fakeLanguage);

      // Assert
      expect(spy).toBeCalledTimes(1);
      spy.mockClear();
    });
    it('Should call languageRepository create() method with the correct parameters', async () => {
      // Arrange
      const fakeLanguage: AddLanguageDTO = {
        language: 'English',
      };
      const fakeCode = { language: 'en' };

      const expectedLanguage: Language = {
        id: 1,
        language: 'en',
        isActive: true,
        isDeleted: false,
      };

      const spy = jest
        .spyOn(languageRepo, 'create')
        .mockReturnValue(Promise.resolve(expectedLanguage));

      // Act
      const response = await service.addLanguage(fakeLanguage);

      // Assert
      expect(spy).toBeCalledWith(fakeCode);
      spy.mockClear();
    });
    it('Should call languageRepository save() method and return correct value ', async () => {
      // Arrange
      const fakeLanguage: AddLanguageDTO = {
        language: 'Swedish',
      };

      const expectedLanguage: Language = {
        id: 1,
        language: 'sv',
        isActive: true,
        isDeleted: false,
      };

      jest
        .spyOn(languageRepo, 'save')
        .mockReturnValue(Promise.resolve(expectedLanguage));

      // Act
      const response = await service.addLanguage(fakeLanguage);

      // Assert
      expect(response).toEqual(expectedLanguage);
    });
  });

  describe('changeActiveStatus() method ', () => {
    it('Should call languageRepository save() method once with correct parameters', async () => {
      // Arrange
      const fakeLang: Language = {
        id: 1,
        language: 'en',
        isActive: false,
        isDeleted: false,
      };
      const fakeResult: Language = {
        id: 1,
        language: 'en',
        isActive: true,
        isDeleted: false,
      };
      const body = {
        isActive: true,
      };
      jest
        .spyOn(languageRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeLang));
      const saveSpy = jest
        .spyOn(languageRepo, 'save')
        .mockReturnValue(Promise.resolve(fakeResult));
      // Act
      const result = await service.changeActiveStatus(body, fakeLang.id);
      // Assert
      expect(saveSpy).toBeCalledTimes(1);
      expect(saveSpy).toBeCalledWith(fakeLang);
    });
    it('Should call languageRepository save() method and return correct value', async () => {
      // Arrange
      const fakeLang: Language = {
        id: 1,
        language: 'en',
        isActive: false,
        isDeleted: false,
      };
      const fakeResult: Language = {
        id: 1,
        language: 'en',
        isActive: true,
        isDeleted: false,
      };

      const body = {
        isActive: true,
      };
      jest
        .spyOn(languageRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeLang));
      jest
        .spyOn(languageRepo, 'save')
        .mockReturnValue(Promise.resolve(fakeResult));
      // Act
      const response = await service.changeActiveStatus(body, fakeLang.id);
      // Assert
      expect(response).toEqual(fakeResult);
    });
  });

  describe('deleteLanguage() method', () => {
    it('Should call languageRepository save() method once with the correct parameters', async () => {
      // Act
      const fakeLang: Language = {
        id: 1,
        language: 'en',
        isActive: false,
        isDeleted: false,
      };

      const saved: Language = {
        id: 1,
        language: 'en',
        isActive: false,
        isDeleted: true,
      };

      const id = 1;
      const spy = jest.spyOn(languageRepo, 'save');
      jest
        .spyOn(languageRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeLang));
      jest.spyOn(userRepo, 'find').mockReturnValue(Promise.resolve([]));
      jest.spyOn(userRepo, 'save').mockReturnValue(Promise.resolve(null));

      // Arrange
      await service.deleteLanguage(id);
      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(saved);
    });

    it('Should return the correct value', async () => {
      // Act
      const fakeLang: Language = {
        id: 1,
        language: 'en',
        isActive: false,
        isDeleted: false,
      };
      const saved: Language = {
        id: 1,
        language: 'en',
        isActive: false,
        isDeleted: true,
      };

      const fakeResponse = { msg: 'Language deleted successfully!' };

      const id = 1;
      jest.spyOn(languageRepo, 'save');
      jest
        .spyOn(languageRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeLang));
      jest.spyOn(userRepo, 'find').mockReturnValue(Promise.resolve([]));
      jest.spyOn(userRepo, 'save').mockReturnValue(Promise.resolve(null));

      // Arrange
      const funcResponse = await service.deleteLanguage(id);
      // Assert
      expect(funcResponse).toEqual(fakeResponse);
    });
  });
});
