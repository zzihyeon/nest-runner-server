import { Injectable } from '@nestjs/common';
import { CreateRunningHistoryInput } from './dto/create-running-history.input';
import { UpdateRunningHistoryInput } from './dto/update-running-history.input';
import { RunningHistory, RunningPath } from './entities/running-history.entity';

class PathList { 
  runningHistoryID: string;
  path: RunningPath;
}

@Injectable()
export class RunningHistoryService {
  private readonly runningHistory: RunningHistory[] = [];
  private readonly pathHistory: PathList[] = [];
  create(createRunningHistoryInput: CreateRunningHistoryInput):RunningHistory {
    const id: string = createRunningHistoryInput.startTime.toDateString();
    this.pathHistory.push({runningHistoryID: id, path: createRunningHistoryInput.runningPath})
    this.runningHistory.push({...createRunningHistoryInput, id: id});
    return {...createRunningHistoryInput, id: id};
  }

  findByUserID(userID: string): RunningHistory[] {
    return this.runningHistory.filter(user=>user.userID === userID);
  }

  update(id: string, updateRunningHistoryInput: UpdateRunningHistoryInput) {
    const timeSnapshot = new Date();
    this.pathHistory.push({runningHistoryID: id, path: updateRunningHistoryInput.runningPath})
    const lastPath: PathList = this.pathHistory.find(user=>user.runningHistoryID === id);
    const distance = Math.sqrt(Math.pow(lastPath.path.latitude - updateRunningHistoryInput.runningPath.latitude, 2) + Math.pow(lastPath.path.longitude - updateRunningHistoryInput.runningPath.longitude, 2));
    //TODO: 위도 경도 거리 계산법 해야 함.
    const duration = timeSnapshot.getTime() - lastPath.path.timeSnapshot.getTime();
    const idx = this.runningHistory.findIndex(runningHistory=>runningHistory.id === id);
    this.runningHistory[idx].totalDistance += distance;
    if (distance < 0) {
      //TODO: 어느정도 움직이지 않으면 휴식 시간인지 정해야 함.
    }
    this.runningHistory[idx].runningDuration += duration;
    return this.runningHistory[idx];
  }

  remove(id: number) {
    return `This action removes a #${id} runningHistory`;
  }
}
