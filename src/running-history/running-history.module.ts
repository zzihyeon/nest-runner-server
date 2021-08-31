import { Module } from '@nestjs/common';
import { RunningHistoryService } from './running-history.service';
import { RunningHistoryResolver } from './running-history.resolver';

@Module({
  providers: [RunningHistoryResolver, RunningHistoryService]
})
export class RunningHistoryModule {}
