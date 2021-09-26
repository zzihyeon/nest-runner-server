import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RunningHistoryService } from './running-history.service';
import { CreateRunningHistoryInput } from './dto/create-running-history.input';
import { UpdateRunningHistoryInput } from './dto/update-running-history.input';

@Resolver('RunningHistory')
export class RunningHistoryResolver {
  constructor(private readonly runningHistoryService: RunningHistoryService) {}

  @Mutation('createRunningHistory')
  create(@Args('createRunningHistoryInput') createRunningHistoryInput: CreateRunningHistoryInput) {
    return this.runningHistoryService.create(createRunningHistoryInput);
  }

  @Query('runningHistorys')
  findAll() {
    return this.runningHistoryService.findAll();
  }

  @Query('runningHistory')
  findOne(@Args('id') id: string) {
    return this.runningHistoryService.findByUserID(id);
  }

  @Mutation('updateRunningHistory')
  update(@Args('updateRunningHistoryInput') updateRunningHistoryInput: UpdateRunningHistoryInput) {
    return this.runningHistoryService.update(updateRunningHistoryInput.id, updateRunningHistoryInput);
  }

  @Mutation('removeRunningHistory')
  remove(@Args('id') id: number) {
    return this.runningHistoryService.remove(id);
  }
}
