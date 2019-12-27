import { Publish } from '../../common/transformer/decorators/publish';

export class ShowArticleLanguageDTO {

  @Publish()
  public id: number;

  @Publish()
  public language: string;

}
