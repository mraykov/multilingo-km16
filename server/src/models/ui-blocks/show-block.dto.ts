import { Publish } from '../../common/transformer/decorators/publish';

export class ShowBlockDTO {
  @Publish()
  public key: string;
  @Publish()
  public content: string;
}
