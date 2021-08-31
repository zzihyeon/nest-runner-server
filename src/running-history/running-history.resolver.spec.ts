import { Test, TestingModule } from '@nestjs/testing';
import { RunningHistoryResolver } from './running-history.resolver';
import { RunningHistoryService } from './running-history.service';

describe('RunningHistoryResolver', () => {
  let resolver: RunningHistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunningHistoryResolver, RunningHistoryService],
    }).compile();

    resolver = module.get<RunningHistoryResolver>(RunningHistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
