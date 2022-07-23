import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TeamEntity {
  @PrimaryColumn()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.team)
  users: UserEntity[];
}
