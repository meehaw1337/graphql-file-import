import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TeamEntity } from './team.entity';

@Entity()
export class UserEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @PrimaryColumn()
  email: string;

  @Column()
  roleDescription: string;

  @ManyToOne(() => TeamEntity, (team) => team.users, { cascade: true })
  team: TeamEntity;

  @Column()
  teamName: string;
}
