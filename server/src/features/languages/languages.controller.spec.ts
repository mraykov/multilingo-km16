import { LanguagesController } from './languages.controller';
import { TestingModule, Test } from '@nestjs/testing';
import { LanguagesService } from './languages.service';
import { Language } from '../../database/entities/languages.entity';
import { AddLanguageDTO } from '../../models/languages/add-language.dto';
import { GoogleDetectionDTO } from '../../models/languages/google-detection.dto';
import { UpdateLanguageDTO } from '../../models/languages/update-language.dto';

describe('Languages Controller', () => {
  let controller: LanguagesController;
  let languagesService: any;

  beforeEach(async () => {
    languagesService = {
      getActiveLanguages() {
        /* empty */
      },

      addLanguage() {
        /* empty */
      },

      changeActiveStatus() {
        /* empty */
      },

      deleteLanguage() {
        /* empty */
      },

      detectLanguage() {
        /* empty */
      },

      transformLanguages() {
        /* empty */
      },
      resetLanguagePreference() {
        /* empty */
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguagesController],
      providers: [
        {
          provide: LanguagesService,
          useValue: languagesService,
        },
      ],
    }).compile();
    controller = module.get<LanguagesController>(LanguagesController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLanguages() method', () => {
    it('Should call getActiveLanguages() method once', async () => {
      // Arrange
      const fakeLanguage: Language = {
        id: 1,
        language: 'en',
        isActive: true,
        isDeleted: false,
      };
      const language = 'English';
      const all = false;
      const allSupportedLang = true;
      const active = false;
      const spy = jest
        .spyOn(languagesService, 'getActiveLanguages')
        .mockReturnValue(Promise.resolve(fakeLanguage));

      // Act
      await controller.getLanguages(language, all, allSupportedLang, active);
      // Assert
      expect(spy).toBeCalledTimes(1);
    });
    it('Should call getActiveLanguages() method with the correct parameters', async () => {
      // Arrange
      const fakeLanguage: Language = {
        id: 1,
        language: 'en',
        isActive: true,
        isDeleted: false,
      };
      const language = 'English';
      const all = false;
      const allSupportedLang = true;
      const active = false;
      const spy = jest
        .spyOn(languagesService, 'getActiveLanguages')
        .mockReturnValue(Promise.resolve(fakeLanguage));

      // Act
      await controller.getLanguages(language, all, allSupportedLang, active);
      // Assert
      expect(spy).toBeCalledWith(language, all, allSupportedLang, active);
    });
    it('Should call getActiveLanguages() method and return correct value', async () => {
      // Arrange
      const fakeLanguage: Language = {
        id: 1,
        language: 'en',
        isActive: true,
        isDeleted: false,
      };
      const language = 'English';
      const all = false;
      const allSupportedLang = true;
      const active = false;
      jest
        .spyOn(languagesService, 'getActiveLanguages')
        .mockReturnValue(Promise.resolve(fakeLanguage));

      // Act
      const result = await controller.getLanguages(
        language,
        all,
        allSupportedLang,
        active,
      );
      // Assert
      expect(result).toEqual(fakeLanguage);
    });
  });

  describe('addlanguage()', () => {
    it('Should call addLanguage() method once', async () => {
      // Arrange
      const language: AddLanguageDTO = { language: 'English' };
      const fakeResult: Language = {
        id: 1,
        language: 'English',
        isActive: true,
        isDeleted: false,
      };
      const spy = jest
        .spyOn(languagesService, 'addLanguage')
        .mockReturnValue(Promise.resolve(fakeResult));
      // Act
      await controller.addLanguage(language);
      // Assert
      expect(spy).toBeCalledTimes(1);
    });
    it('Should call addLanguage() method with the correct parameters', async () => {
      // Arrange
      const language: AddLanguageDTO = { language: 'English' };
      const fakeResult: Language = {
        id: 1,
        language: 'English',
        isActive: true,
        isDeleted: false,
      };
      const spy = jest
        .spyOn(languagesService, 'addLanguage')
        .mockReturnValue(Promise.resolve(fakeResult));
      // Act
      await controller.addLanguage(language);
      // Assert
      expect(spy).toBeCalledWith(language);
    });
    it('Should call addLanguage() and return correct value', async () => {
      // Arrange
      const language: AddLanguageDTO = { language: 'English' };
      const fakeResult: Language = {
        id: 1,
        language: 'English',
        isActive: true,
        isDeleted: false,
      };
      jest
        .spyOn(languagesService, 'addLanguage')
        .mockReturnValue(Promise.resolve(fakeResult));
      // Act
      const result = await controller.addLanguage(language);
      // Assert
      expect(result).toEqual(fakeResult);
    });
  });
  describe('detectlanguage() method', () => {
    it('Should call detectLanguage() method once', async () => {
      // Arrange
      const fakeResult: GoogleDetectionDTO = {
        language: 'English',
        isReliable: true,
        confidence: 1,
      };
      const detectionText = { text: 'string' };
      const spy = jest
        .spyOn(languagesService, 'detectLanguage')
        .mockReturnValue(Promise.resolve(fakeResult));
      // Act
      await controller.detectLanguage(detectionText);
      // Assert
      expect(spy).toBeCalledTimes(1);
    });
    it('Should call detectLanguage() method with the correct parameters', async () => {
      // Arrange
      const fakeResult: GoogleDetectionDTO = {
        language: 'English',
        isReliable: true,
        confidence: 1,
      };
      const detectionText = { text: 'string' };
      const spy = jest
        .spyOn(languagesService, 'detectLanguage')
        .mockReturnValue(Promise.resolve(fakeResult));
      // Act
      await controller.detectLanguage(detectionText);
      // Assert
      expect(spy).toBeCalledWith(detectionText);
    });
    it('Should call detectLanguage() and return correct value', async () => {
      // Arrange
      const fakeResult: GoogleDetectionDTO = {
        language: 'English',
        isReliable: true,
        confidence: 1,
      };
      const detectionText = { text: 'string' };
      jest
        .spyOn(languagesService, 'detectLanguage')
        .mockReturnValue(Promise.resolve(fakeResult));
      // Act
      const result = await controller.detectLanguage(detectionText);
      // Assert
      expect(result).toEqual(fakeResult);
    });
  });
  describe('isActive() method', () => {
    it('Should call changeActiveStatus() method once', async () => {
      // Arrange
      const body: UpdateLanguageDTO = {
        isActive: true,
      };
      const id = 1;
      const fakeResult: Language = {
        id: 1,
        language: 'Spanish',
        isActive: true,
        isDeleted: false,
      };
      const spy = jest
        .spyOn(languagesService, 'changeActiveStatus')
        .mockReturnValue(fakeResult);
      // Act
      await controller.isActive(body, id);
      // Assert
      expect(spy).toBeCalledTimes(1);
    });
    it('Should call changeActiveStatus() method with the correct values', async () => {
      // Arrange
      const body: UpdateLanguageDTO = {
        isActive: true,
      };
      const id = 1;
      const fakeResult: Language = {
        id: 1,
        language: 'Spanish',
        isActive: true,
        isDeleted: false,
      };
      const spy = jest
        .spyOn(languagesService, 'changeActiveStatus')
        .mockReturnValue(fakeResult);
      // Act
      await controller.isActive(body, id);
      // Assert
      expect(spy).toBeCalledWith(body, id);
    });
    it('Should call changeActiveStatus() method and return the correct value', async () => {
      // Arrange
      const body: UpdateLanguageDTO = {
        isActive: true,
      };
      const id = 1;
      const fakeResult: Language = {
        id: 1,
        language: 'Spanish',
        isActive: true,
        isDeleted: false,
      };
      jest
        .spyOn(languagesService, 'changeActiveStatus')
        .mockReturnValue(fakeResult);
      // Act
      const result = await controller.isActive(body, id);
      // Assert
      expect(result).toEqual(fakeResult);
    });
  });
  describe('delete() method', () => {
    it('Should call deleteLanguage() method once', async () => {
      // Arrange
      const id = 1;
      const fakeResult = {
        msg: 'successfull',
      };
      const spy = jest
        .spyOn(languagesService, 'deleteLanguage')
        .mockReturnValue(fakeResult);
      // Act
      await controller.delete(id);
      // Assert
      expect(spy).toBeCalledTimes(1);
    });
    it('Should call deleteLanguage() method with the correct parameters', async () => {
      // Arrange
      const id = 1;
      const fakeResult = {
        msg: 'successfull',
      };
      const spy = jest
        .spyOn(languagesService, 'deleteLanguage')
        .mockReturnValue(fakeResult);
      // Act
      await controller.delete(id);
      // Assert
      expect(spy).toBeCalledWith(id);
    });
    it('Should call deleteLanguage() method and return the correct value', async () => {
      // Arrange
      const id = 1;
      const fakeResult = {
        msg: 'successfull',
      };
      jest
        .spyOn(languagesService, 'deleteLanguage')
        .mockReturnValue(fakeResult);
      // Act
      const result = await controller.delete(id);
      // Assert
      expect(result).toEqual(fakeResult);
    });
  });
});
