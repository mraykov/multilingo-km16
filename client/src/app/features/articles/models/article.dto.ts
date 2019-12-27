export class ArticleDTO {
  public id: number;
  public version: number;
  public title: { id: number, text: string };
  public content: { id: number, text: string };
  public author: { username: string };
  public user: string;
  public datePublish: string;
  public isCurrent: boolean;
  public language: { language: string };
}
