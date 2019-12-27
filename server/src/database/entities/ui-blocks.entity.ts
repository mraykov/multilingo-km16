import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ui-blocks')
export class UiBlocksEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ type: 'text' })
  public key: string;
  @Column({type: 'text'})
  public content: string;
}
