import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeamEntity } from './team.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  roleDescription: string;

  @ManyToOne(() => TeamEntity, (team) => team.users, { cascade: true })
  team: TeamEntity;

  @Column()
  teamId: string;
}
