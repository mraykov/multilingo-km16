import { createConnection } from 'typeorm';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Article } from '../entities/article.entity';
import { ArticleVersion } from '../entities/article-version.entity';
import { Language } from '../entities/languages.entity';
import { Rate } from '../entities/rate.entity';
import { UiBlocksEntity } from '../entities/ui-blocks.entity';

const main = async () => {
  const connection = await createConnection();
  const articlesRepo = connection.getRepository(Article);
  const versionRepo = connection.getRepository(ArticleVersion);
  const languageRepo = connection.getRepository(Language);
  const rateRepo = connection.getRepository(Rate);
  const roleRepo = connection.getRepository(Role);
  const blockRepo = connection.getRepository(UiBlocksEntity);
  const userRepo = connection.getRepository(User);

  // Clean all data
  try {
    await versionRepo.delete({});
    await articlesRepo.delete({});
    await languageRepo.delete({});
    await rateRepo.delete({});
    await blockRepo.delete({});
    await userRepo.delete({});
    await roleRepo.delete({});
    await connection.close();
    console.log(`Data cleaned successfully!`);
  } catch (error) {
    console.log(error);
  }

  // tslint:disable-next-line: no-console
};

main()
  // tslint:disable-next-line: no-console
  .catch(console.log);
