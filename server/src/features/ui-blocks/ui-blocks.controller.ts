import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UiBlocksService } from './ui-blocks.service';
import { AddUiBlockDTO } from '../../models/ui-blocks/add-ui-block.dto';
import { AuthGuard } from '@nestjs/passport';
import { ShowBlockDTO } from '../../models/ui-blocks/show-block.dto';
import { TransformInterceptor } from '../../common/transformer/interceptors/transform.interceptor';

@Controller('ui-blocks')
export class UiBlocksController {
  constructor(private readonly uiService: UiBlocksService) {}

  @Get()
  public async getLanguageSpecificBlock(@Query('language') language: string) {
    return await this.uiService.getLanguageSpecificBlock(language);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async addNewBlock(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: AddUiBlockDTO,
  ) {
    return await this.uiService.addNewBlock(body);
  }

  @Patch()
  @UseInterceptors(new TransformInterceptor(ShowBlockDTO))
  @UseGuards(AuthGuard('jwt'))
  public async updateBlock(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: AddUiBlockDTO,
  ): Promise<ShowBlockDTO> {
    return await this.uiService.updateBlock(body);
  }
}
