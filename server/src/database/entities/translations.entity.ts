import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { TranslationSourceEnum } from '../../common/enums/translation-source.enum';
import { TranslationTypeEnum } from '../../common/enums/translation-type.enum';
import { Rate } from './rate.entity';

@Entity('translations')
export class Translations {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ type: 'text' })
  public text: string;
  @Column({ type: 'varchar' })
  public originLanguage: string;
  @Column({ type: 'varchar' })
  public targetLanguage: string;
  @Column({type: 'text'})
  public translation: string;
  @Column()
  public source: TranslationSourceEnum;
  @Column()
  public type: TranslationTypeEnum;
  @ManyToOne(type => User, {nullable: true})
  public editor: User;
  @OneToMany(type => Rate, rate => rate.translantion, {nullable: true})
  public rates: Promise<Rate[]>;
}
