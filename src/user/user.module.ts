import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/entity/user.entity';
import { TeamEntity } from './model/entity/team.entity';
import { TeamResolver } from './resolver/team.resolver';
import { UserService } from './service/user.service';
import { TeamService } from './service/team.service';
import { UserResolver } from './resolver/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TeamEntity])],
  providers: [UserService, TeamService],
  exports: [UserService, TeamService],
})
export class UserModule {
  public static registerWithResolversAsync(): DynamicModule {
    return {
      module: UserModule,
      providers: [TeamResolver, UserResolver],
    };
  }
}
