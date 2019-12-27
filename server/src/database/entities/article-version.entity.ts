import { User } from './user.entity';
import { Language } from './languages.entity';
import { CreateDateColumn, Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class ArticleVersion {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'int', default: 1 })
  public version: number;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'text' })
  public content: string;

  @Column({ type: 'boolean', default: true })
  public isCurrent: boolean;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @Column({type: 'boolean', default: true})
  public isPublsihed: boolean;

  @CreateDateColumn()
  public datePublish: Date;

  @ManyToOne(type => Language)
  public language: Promise<Language>;

  @ManyToOne(type => User, user => user.articleVersion)
  public author: Promise<User>;

  @ManyToOne(type => Article, article => article.versions)
  public article: Promise<Article>;

}
