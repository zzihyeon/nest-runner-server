import { RunningPath } from "../entities/running-history.entity";

export class CreateRunningHistoryInput {
    id: string;
    userID: string;
    startTime: Date;
    restDuration: number;
    runningDuration: number;
    totalDistance: number;
    runningPath: RunningPath;
}
