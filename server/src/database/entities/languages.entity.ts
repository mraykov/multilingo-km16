import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('languages')
export class Language {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', {unique: true})
    public language: string;

    @Column({type: 'boolean', default: true})
    public isActive: boolean;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

}
