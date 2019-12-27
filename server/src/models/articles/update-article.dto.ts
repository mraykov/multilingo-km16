import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateArticleDTO {

  @IsNotEmpty()
  @ApiModelProperty({ example: { id: 2, text: 'Some title to be updated!' } })
  public title: { id: number, text: string };

  @IsNotEmpty()
  @ApiModelProperty({ example: { id: 1, text: 'Some big content with a lot of words which will be updated!' } })
  public content: { id: number, text: string };

  @IsNotEmpty()
  @ApiModelProperty({ example: 'en' })
  public language: string;

}
