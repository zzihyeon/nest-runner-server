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

  private getDistance(lat1, lon1, lat2, lon2): number {
    if ((lat1 == lat2) && (lon1 == lon2))
        return 0;

    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radTheta = Math.PI * theta / 180;
    var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1)
        dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
  }

  create(createRunningHistoryInput: CreateRunningHistoryInput):RunningHistory {
    const startTime = new Date();
    const id: string = startTime.getTime().toString() + createRunningHistoryInput.userID;
    this.pathHistory.push({runningHistoryID: id, path: {...createRunningHistoryInput.runningPath, timeSnapshot: new Date()}})
    this.runningHistory.push({...createRunningHistoryInput, id: id, startTime: startTime});
    return {...createRunningHistoryInput, id: id, startTime: startTime};
  }

  findAll(): RunningHistory[] {
    return this.runningHistory;
  }

  findByUserID(userID: string): RunningHistory[] {
    return this.runningHistory.filter(user=>user.userID === userID);
  }

  update(id: string, updateRunningHistoryInput: UpdateRunningHistoryInput) {
    const timeSnapshot = new Date();
    this.pathHistory.push({runningHistoryID: id, path: updateRunningHistoryInput.runningPath})
    const lastPath: PathList = this.pathHistory.find(user=>user.runningHistoryID === id);
    const distance = this.getDistance(lastPath.path.latitude, lastPath.path.longitude,updateRunningHistoryInput.runningPath.latitude ,updateRunningHistoryInput.runningPath.longitude);
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
