import { Publish } from '../../common/transformer/decorators/publish';

export class ArticleTranslationTextDTO {

  @Publish()
  public id: number;

  @Publish()
  public text: string;

}
