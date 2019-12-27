import { Module } from '@nestjs/common';
import { UiBlocksController } from './ui-blocks.controller';
import { UiBlocksService } from './ui-blocks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UiBlocksEntity } from '../../database/entities/ui-blocks.entity';
import { TranslationsModule } from '../translations/translations.module';
import { Translations } from '../../database/entities/translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UiBlocksEntity, Translations]), TranslationsModule],
  controllers: [UiBlocksController],
  providers: [UiBlocksService],
})
export class UiBlocksModule {}
