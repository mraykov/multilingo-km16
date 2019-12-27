import { Publish } from '../../common/transformer/decorators/publish';

export class GoogleDetectionDTO {

  @Publish()
  public language: string;

  public isReliable: boolean;

  public confidence: number;

}
