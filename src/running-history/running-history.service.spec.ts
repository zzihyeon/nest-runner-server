import { Test, TestingModule } from '@nestjs/testing';
import { RunningHistoryService } from './running-history.service';
import { CreateRunningHistoryInput } from './dto/create-running-history.input';
import { UpdateRunningHistoryInput } from './dto/update-running-history.input';
import { RunningHistory, RunningPath } from './entities/running-history.entity';

describe('RunningHistoryService', () => {
  let service: RunningHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunningHistoryService],
    }).compile();

    service = module.get<RunningHistoryService>(RunningHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create RunningHistory test', () => {
    const timeSnapshot = new Date();
    const id = timeSnapshot.toDateString();
    const createInput: CreateRunningHistoryInput = {
      id: id,
      userID: "jh",
      startTime:timeSnapshot,
      restDuration: 0,
      runningDuration: 0,
      totalDistance: 0,
      runningPath: {
        latitude:0,
        longitude:0,
        timeSnapshot: timeSnapshot,
      }
    }
    const runningHistory = service.create(createInput);
    expect(runningHistory.userID).toBe("jh");
    expect(runningHistory.id).toBe(timeSnapshot.toDateString());
    expect(runningHistory.startTime).toBe(timeSnapshot);
    expect(runningHistory.restDuration).toBe(0);
    expect(runningHistory.runningDuration).toBe(0);
    expect(runningHistory.totalDistance).toBe(0);
  });

  it('update RunningHistory test', () => {
    let timeSnapshot = new Date();
    const id = timeSnapshot.toDateString();
    const createInput: CreateRunningHistoryInput = {
      id: id,
      userID: "jh",
      startTime:timeSnapshot,
      restDuration: 0,
      runningDuration: 0,
      totalDistance: 0,
      runningPath: {
        latitude:0,
        longitude:0,
        timeSnapshot: timeSnapshot,
      }
    }
    const runningHistory = service.create(createInput);
    
    expect(runningHistory.userID).toBe("jh");
    expect(runningHistory.id).toBe(id);
    expect(runningHistory.startTime).toBe(timeSnapshot);
    expect(runningHistory.restDuration).toBe(0);
    expect(runningHistory.runningDuration).toBe(0);
    expect(runningHistory.totalDistance).toBe(0);
    timeSnapshot.setSeconds(timeSnapshot.getSeconds() - 1);
    const updateInput: UpdateRunningHistoryInput = {
      id: id,
      userID: "jh",
      runningPath: {
        latitude:3,
        longitude:4,
        timeSnapshot: timeSnapshot,
      }
    }
    const updatedRunningHistory = service.update(id, updateInput);
    expect(updatedRunningHistory.userID).toBe("jh");
    expect(updatedRunningHistory.id).toBe(timeSnapshot.toDateString());
    expect(updatedRunningHistory.startTime).toBe(timeSnapshot);
    expect(updatedRunningHistory.restDuration).toBe(0);
    expect(updatedRunningHistory.runningDuration).toBeGreaterThan(0);
    expect(updatedRunningHistory.totalDistance).toBe(5);
  });

  it('find RunningHistory By User test', () => {
    let timeSnapshot = new Date();
    const id = timeSnapshot.toDateString();
    const createInput: CreateRunningHistoryInput = {
      id: id,
      userID: "jh",
      startTime:timeSnapshot,
      restDuration: 0,
      runningDuration: 0,
      totalDistance: 0,
      runningPath: {
        latitude:0,
        longitude:0,
        timeSnapshot: timeSnapshot,
      }
    }
    const runningHistory = service.create(createInput);
    
    expect(runningHistory.userID).toBe("jh");
    expect(runningHistory.id).toBe(id);
    expect(runningHistory.startTime).toBe(timeSnapshot);
    expect(runningHistory.restDuration).toBe(0);
    expect(runningHistory.runningDuration).toBe(0);
    expect(runningHistory.totalDistance).toBe(0);
    timeSnapshot.setSeconds(timeSnapshot.getSeconds() - 1);
    
    const updatedRunningHistory = service.findByUserID("jh");
    expect(updatedRunningHistory[0].userID).toBe("jh");
    expect(updatedRunningHistory[0].id).toBe(timeSnapshot.toDateString());
    expect(updatedRunningHistory[0].startTime).toBe(timeSnapshot);
    expect(updatedRunningHistory[0].restDuration).toBe(0);
    expect(updatedRunningHistory[0].runningDuration).toBe(0);
    expect(updatedRunningHistory[0].totalDistance).toBe(0);
  });
});
