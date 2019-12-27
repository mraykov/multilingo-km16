import { IsNotEmpty, Min, Max } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRateDTO {

  @IsNotEmpty()
  @ApiModelProperty({ example: 'Replace with text' })
  public translationId: number;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @ApiModelProperty({ example: 4 })
  public rate: number;

}
