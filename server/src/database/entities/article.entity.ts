import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { ArticleVersion } from './article-version.entity';

@Entity()
export class Article {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @CreateDateColumn()
  public createdOn: Date;

  @UpdateDateColumn()
  public updatedOn: Date;

  @ManyToOne(type => User, user => user.articles)
  public author: Promise<User>;

  @OneToMany(type => ArticleVersion, articleVersion => articleVersion.article)
  public versions: Promise<ArticleVersion[]>;

}
