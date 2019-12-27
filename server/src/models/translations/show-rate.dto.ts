import { Publish } from '../../common/transformer/decorators/publish';

export class ShowRateDTO {

  @Publish()
  public avgRate: number;

}
