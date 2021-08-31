import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { RunningHistoryModule } from './running-history/running-history.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths:['*/**/*.graphql'],
      debug: false,
    }),
    UsersModule,
    RunningHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
