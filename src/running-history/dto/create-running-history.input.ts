import { RunningPath } from "../entities/running-history.entity";

export class CreateRunningHistoryInput {
    userID: string;
    startTime: Date;
    restDuration: number;
    runningDuration: number;
    totalDistance: number;
    runningPath: RunningPath;
}
