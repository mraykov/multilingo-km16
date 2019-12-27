import { createConnection } from 'typeorm';
import { UiBlocksEntity } from '../entities/ui-blocks.entity';
import { SupportedLanguagesEnum } from '../../common/enums/supported-languages.enum';
import { TranslationTypeEnum } from '../../common/enums/translation-type.enum';
import { Translations } from '../entities/translations.entity';
import { Language } from '../entities/languages.entity';
import * as GoogleTranslate from '@google-cloud/translate';
import { TranslationSourceEnum } from '../../common/enums/translation-source.enum';

const main = async () => {
  // UI Blocks
  const blocks = [
    { key: 'HOME', content: 'Home' },
    { key: 'MY_PROFILE', content: 'My profile' },
    { key: 'ARTICLES', content: 'Articles' },
    { key: 'ABOUT_US', content: 'About us' },
    { key: 'SETTINGS', content: 'Settings' },
    { key: 'MY_ARTICLES', content: 'My Articles' },
    { key: 'ADMINISTRATOR', content: 'Administrator' },
    { key: 'UI_BLOCKS', content: 'UI Components' },
    { key: 'TRANSLATIONS', content: 'Translations' },
    { key: 'USERS', content: 'Users' },
    { key: 'LOGIN', content: 'Login' },
    { key: 'LOGOUT', content: 'Logout' },
    { key: 'PUBLISH_YOUR_ARTICLES', content: 'Publish your articles' },
    {
      key: 'PUBLISH_YOUR_ARTICLES_TEXT',
      content: 'Publish your favourite articles for free',
    },
    { key: 'AUTOMATIC_TRANSLATION', content: 'Automatic translation' },
    {
      key: 'AUTOMATIC_TRANSLATION_TEXT',
      content: 'Get automatic translation to all supported languages',
    },
    { key: 'EDIT_TRANSLATIONS', content: 'Edit translations' },
    {
      key: 'EDIT_TRANSLATIONS_TEXT',
      content: 'Improve automatic translations with your own text',
    },
    { key: 'ENTER_USERNAME', content: 'Enter your username' },
    {
      key: 'ERROR_USERNAME',
      content: 'Your username should have at least 5 characters',
    },
    {
      key: 'ERROR_PASSWORD',
      content: 'Your password should have at least 8 characters',
    },
    { key: 'REGISTER', content: 'Register' },
    { key: 'USERNAME', content: 'Username' },
    { key: 'FIRSTNAME_ERROR', content: 'You must enter your first name' },
    { key: 'FIRSTNAME', content: 'First name' },
    { key: 'LASTNAME', content: 'Last name' },
    { key: 'LASTNAME_ERROR', content: 'You must enter your last name' },
    { key: 'EMAIL_ERROR', content: 'Please enter a valid email' },
    { key: 'ENTER_PASSWORD', content: 'Enter your password' },
    {
      key: 'REG_PASSWORD_ERROR',
      content:
        'Your password should have at least 8 characters and contain at least one letter and one number',
    },
    { key: 'CONFIRM_PASSWORD', content: 'Confirm your password' },
    { key: 'PASSWORD_MATCH_ERROR', content: 'Your passwords do not match!' },
    { key: 'CREATE_UI_BLOCK', content: 'Create UI component' },
    { key: 'KEY_FIELD_REQUIRED', content: 'The key field is required' },
    { key: 'ENTER_KEY_VALUE', content: 'Enter key value' },
    { key: 'ENTER_VALUE', content: 'Enter value' },
    { key: 'VALUE_FIELD_REQUIRED', content: 'The value field is required' },
    { key: 'BUTTON_ADD', content: 'Add' },
    { key: 'SEARCH_PLACEHOLDER', content: 'What are you searching for?' },
    { key: 'MOST_RECENT_ARTICLES', content: 'Most recent articles' },
    {
      key: 'NO_TEXT_RESULTS',
      content: 'The text you are searching for is not here...',
    },
    { key: 'SEARCH_IN_ARTICLES', content: 'Search in all articles' },
    { key: 'PUBLISHED_ON', content: 'Published on' },
    { key: 'BY', content: 'by' },
    { key: 'READ_MORE', content: 'Read more' },
    { key: 'USER', content: 'User' },
    { key: 'USER_ID', content: 'User ID' },
    { key: 'ROLE', content: 'Role' },
    { key: 'EMAIL', content: 'Email' },
    { key: 'REGISTERED_ON', content: 'Registered on' },
    { key: 'CHANGE_PASSWORD', content: 'Change password' },
    { key: 'OLD_PASSWORD', content: 'Old password' },
    { key: 'NEW_PASSWORD', content: 'New password' },
    { key: 'OPEN_CURRENT', content: 'Open current version' },
    { key: 'SHOW_ALL_VERSIONS', content: 'Show all versions' },
    { key: 'TITLE', content: 'Title' },
    { key: 'ACTIONS', content: 'Actions' },
    { key: 'CURRENT', content: 'Current' },
    { key: 'MAKE_CURRENT', content: 'Make current' },
    { key: 'DELETE', content: 'Delete' },
    { key: 'DELETE_VERSION', content: 'Delete version' },
    { key: 'NO_UNDO', content: 'You cannot undo this action!' },
    { key: 'OPEN_VERSION', content: 'Open version' },
    { key: 'NO_ARTICLES', content: 'Sorry, no articles here' },
    { key: 'DETAILS', content: 'Details' },
    { key: 'EDIT', content: 'Edit' },
    { key: 'SAVE', content: 'Save' },
    { key: 'ORIGINAL_TRANSLATION', content: 'Original Translation' },
    { key: 'TRANSLATION_LANGUAGE', content: 'Translation Language' },
    { key: 'TRANSLATION', content: 'Translation' },
    { key: 'TYPE', content: 'Type' },
    { key: 'TRANSLATED_ON', content: 'Translated on' },
    { key: 'WRITEN_ON', content: 'Writen on' },
    { key: 'EDIT_TRANSLATION', content: 'Edit translation' },
    { key: 'CRATE_ARTICLE', content: 'Create Article' },
    { key: 'SHOW_ALL_ARTICLES', content: 'Show all articles' },
    { key: 'CREATE_ARTICLE_TITLE', content: 'Create article title' },
    { key: 'CREATE_ARTICLE_CONTENT', content: 'Create article content' },
    { key: 'CREATE', content: 'Create' },
    { key: 'ALL_ARTICLES', content: 'All articles' },
    { key: 'UPDATE', content: 'Update' },
    { key: 'BACK', content: 'Back' },
    { key: 'MSG_DELETE_ARTICLE', content: 'The article was deleted!' },
    { key: 'ARTICLE', content: 'Article' },
    { key: 'UPDATE_ARTICLE_TITLE', content: 'Update article title' },
    { key: 'UPDATE_ARTICLE_CONTENT', content: 'Update article content' },
    { key: 'MSG_DELETE_MODAL', content: 'You can not undo this action!' },
    { key: 'CHOOSE_WRITING_LANGUAGE', content: 'Choose writing language:' },
    { key: 'LANGUAGES', content: 'Languages' },
    {
      key: 'ORIGINAL_TEXT_TRANSLATION_TEXT',
      content: 'Original text / Translated text',
    },
    { key: 'TRANSLATED_ARTICLE', content: 'Translated Article' },
    { key: 'ORIGIANL_ARTICLE', content: 'Created Article' },
    { key: 'INPUT_TEXT_FOR_CONTENT', content: 'Input text for content...' },
    { key: 'INPUT_TEXT_FOR_TITLE', content: 'Input text for title...' },
    { key: 'SEARCH_IN_TRANSLATION', content: 'Search in translation' },
    { key: 'SEARCH_IN_TYPE', content: 'Search in type' },
    {
      key: 'FOOTER_TEXT',
      content:
        'Translator offers users to public articles and receive automatic translation with all supported languages',
    },
    { key: 'TECHNOLOGIES', content: 'Technologies' },
    { key: 'PREFERRED_LANGUAGE', content: 'Preferred language' },
    { key: 'CHANGE_PREFERRED_LANGUAGE', content: 'Change preferred langauge' },
    { key: 'ACTIVE', content: 'Active' },
    { key: 'INACTIVE', content: 'Inactive' },
    { key: 'CHANGE_STATUS', content: 'Change status' },
    { key: 'ADD_LANGUAGE_PLACEHOLDER', content: 'Choose a language to add' },
    { key: 'DEFAULT_LANGUAGE', content: 'Default by the browser' },
    { key: 'VERSION', content: 'Version' },
    { key: 'STATUS', content: 'Status' },
    { key: 'CHANGE_ROLE', content: 'Change role' },
    { key: 'CONTRIBUTOR', content: 'Contributor' },
    { key: 'EDITOR', content: 'Editor' },
    { key: 'ACTIVATE', content: 'Activate' },
    { key: 'DETECT', content: 'Detect' },
    { key: 'DELETED', content: 'Deleted' },
  ];

  // Resolve dependencies
  const connection = await createConnection();
  const blockRepo = connection.getRepository(UiBlocksEntity);
  const translateRepo = connection.getRepository(Translations);
  const langRepo = connection.getRepository(Language);

  // Translate to all languages funcion
  const supportedLanguages = await langRepo.find({
    select: ['language'],
  });
  const langArray = supportedLanguages.map(language => language.language);
  const translateText = async textToTranslate => {
    try {
      await Promise.all(
        langArray.map(async language => {
          const translate = { ...textToTranslate, targetLanguage: language };
          const automatic = new GoogleTranslate.v2.Translate();
          const [translated] = await automatic.translate(
            translate.text,
            language,
          );
          const textToSave = new Translations();
          textToSave.text = translate.text;
          textToSave.originLanguage = SupportedLanguagesEnum.English;
          textToSave.targetLanguage = language;
          textToSave.translation = translated;
          textToSave.source = TranslationSourceEnum.AUTO;
          textToSave.type = TranslationTypeEnum.UI;
          textToSave.editor = null;
          textToSave.rates = null;
          await translateRepo.save(textToSave);
        }),
      );
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  };

  // UI Blocks IIFE
  try {
    await (async () => {
      await Promise.all(
        blocks.map(async block => {
          const found = await blockRepo.findOne({ where: { key: block.key } });
          if (!found) {
            const entity = new UiBlocksEntity();
            entity.key = block.key;
            entity.content = block.content;
            const entityTranslate = {
              text: entity.content,
              originLanguage: SupportedLanguagesEnum.English,
              type: TranslationTypeEnum.UI,
            };
            await translateText(entityTranslate);
            await blockRepo.save(entity);
          }
        }),
      );
    })();

    // End of seeding
    await connection.close();
    // tslint:disable-next-line: no-console
    console.log('All UI componentes were seeded and translated successfully!');
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

main()
  // tslint:disable-next-line: no-console
  .catch(console.log);
