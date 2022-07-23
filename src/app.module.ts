import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { DbConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { FileImportModule } from './file-import/file-import.module';
import { UserService } from './user/service/user.service';
import { createUsersDataLoader } from './user/data-loader/users.data-loader';
import { TeamService } from './user/service/team.service';
import { createTeamsDataLoader } from './user/data-loader/teams.data-loader';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [UserModule],
      useFactory: (userService: UserService, teamService: TeamService) => ({
        autoSchemaFile: 'schema.gql',
        context: () => ({
          usersLoader: createUsersDataLoader(userService),
          teamsLoader: createTeamsDataLoader(teamService),
        }),
      }),
      inject: [UserService, TeamService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: DbConfig,
    }),
    UserModule.registerWithResolversAsync(),
    FileImportModule.registerWithResolversAsync(),
  ],
})
export class AppModule {}
