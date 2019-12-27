import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DetectionTextDTO {

  @IsNotEmpty()
  @ApiModelProperty({ example: 'Some big content with a lot of words for detection!' })
  public text: string;

}
