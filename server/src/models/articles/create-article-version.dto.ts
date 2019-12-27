import { Language } from '../../database/entities/languages.entity';
import { User } from '../../database/entities/user.entity';
import { Article } from '../../database/entities/article.entity';

export class CreateArticleVersionDTO {

  title: string;
  content: string;
  language: Promise<Language>;
  author: Promise<User>;
  article: Promise<Article>;

}
