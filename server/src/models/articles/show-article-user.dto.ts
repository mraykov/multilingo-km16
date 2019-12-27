import { Publish } from '../../common/transformer/decorators/publish';

export class ShowArticleUserDTO {

  @Publish()
  public id: number;

  @Publish()
  public username: string;

}
