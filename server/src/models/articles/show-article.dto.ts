import { ShowArticleUserDTO } from './show-article-user.dto';
import { Publish } from '../../common/transformer/decorators/publish';
import { User } from '../../database/entities/user.entity';

export class ShowArticleDTO {

  @Publish()
  public id: number;

  @Publish()
  public createdOn: Date;

  @Publish()
  public updatedOn: Date;

  @Publish(ShowArticleUserDTO)
  public author: User;

}
