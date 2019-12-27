import { Publish } from '../../common/transformer/decorators/publish';
import { Language } from '../../database/entities/languages.entity';
import { User } from '../../database/entities/user.entity';
import { ShowArticleUserDTO } from './show-article-user.dto';
import { ShowArticleLanguageDTO } from './show-article-language.dto';
import { Article } from '../../database/entities/article.entity';

export class ShowArticleVersionDTO {

  @Publish()
  public id: number;

  @Publish()
  public title: string;

  @Publish()
  public content: string;

  @Publish()
  public version: number;

  @Publish()
  public isCurrent: boolean;

  @Publish(ShowArticleLanguageDTO)
  public language: Language;

  @Publish()
  public datePublish: Date;

  @Publish(ShowArticleUserDTO)
  public author: User;

  // @Publish(ShowArticleDTO)
  public article: Article;

}
