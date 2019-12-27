import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { RoleTypes } from '../../common/enums/role.enum';

@Entity()
export class Role {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'enum', enum: RoleTypes, default: 'Contributor' })
  public roleName: RoleTypes;

  @OneToMany( type => User, user => user.role )
  public users: Promise<User[]>;

}
