import { createConnection } from 'typeorm';
import { UiBlocksEntity } from '../entities/ui-blocks.entity';
import { Translations } from '../entities/translations.entity';
import { TranslationTypeEnum } from '../../common/enums/translation-type.enum';

const main = async () => {
  const connection = await createConnection();
  const blocksRepo = connection.getRepository(UiBlocksEntity);
  const translateRepo = connection.getRepository(Translations);

  // Clean all data
  await blocksRepo.delete({});
  await translateRepo.delete({type: TranslationTypeEnum.UI});

  await connection.close();
  // tslint:disable-next-line: no-console
  console.log(`Data cleaned successfully!`);
};

main()
  // tslint:disable-next-line: no-console
  .catch(console.log);
