import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Min, Max } from 'class-validator';
import { Translations } from '../entities/translations.entity';

@Entity()
export class Rate {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'int', default: 0 })
  @Min(0)
  @Max(5)
  public rate: number;

  @ManyToOne(type => Translations, translate => translate.rates)
  public translantion: Promise<Translations>;

}
