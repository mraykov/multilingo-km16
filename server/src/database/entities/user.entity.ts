import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Article } from './article.entity';
import { Role } from './role.entity';
import { ArticleVersion } from './article-version.entity';
import { IsEmail } from 'class-validator';
import { Language } from './languages.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', length: 200, unique: true })
    public username: string;

    @Column({ type: 'varchar', length: 200 })
    @IsEmail()
    public email: string;

    @Column({ type: 'varchar', length: 300 })
    public password: string;

    @Column({ type: 'varchar', length: 200 })
    public firstName: string;

    @Column({ type: 'varchar', length: 200 })
    public lastName: string;

    @Column({ type: 'boolean', default: false })
    public deleted: boolean;

    @CreateDateColumn()
    public dateRegistration: Date;

    @ManyToOne(type => Language)
    public preferredLanguage: Language;

    @ManyToOne(type => Role, role => role.users, {eager: true})
    role: Role;

    @OneToMany(type => Article, article => article.author)
    public articles: Promise<Article[]>;

    @OneToMany(type => ArticleVersion, articleVersion => articleVersion.author)
    public articleVersion: Promise<ArticleVersion[]>;

}
