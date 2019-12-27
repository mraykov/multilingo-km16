import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateArticleDTO {

  @IsNotEmpty()
  @ApiModelProperty({ example: 'Some title' })
  public title: string;

  @IsNotEmpty()
  @ApiModelProperty({ example: 'Some big content with a lot of words!' })
  public content: string;

  @IsNotEmpty()
  @ApiModelProperty({ example: 'en' })
  public language: string;

}
