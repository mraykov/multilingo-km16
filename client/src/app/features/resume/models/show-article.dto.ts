export class ShowArticleDTO {
  public id: number;

  public title: { id: number, text: string };

  public content: { id: number, text: string };

  public version: number;

  public isCurrent: boolean;

  public language: string;

  public datePublish: Date | string;

  public user: string;

  public article: string;
}
