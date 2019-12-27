import { Publish } from '../../common/transformer/decorators/publish';
import { ArticleTranslationTextDTO } from './article-translation-text.dto';

export class ShowTranslatedArticleDTO {
    @Publish()
    public id: number;
    @Publish()
    public version: number;
    @Publish()
    public title: ArticleTranslationTextDTO | string;
    @Publish()
    public content: ArticleTranslationTextDTO | string;
    @Publish()
    public user: string;
    @Publish()
    public language: string;
    @Publish()
    public datePublish: string;
    @Publish()
    public isCurrent: boolean;
    @Publish()
    public isPublished: boolean;
}
