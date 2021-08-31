export class RunningHistory {
    id: string;
    userID: string;
    startTime: Date;
    restDuration: number;
    runningDuration: number;
    totalDistance: number;
}

export class RunningPath {
    latitude: number;  //위도
    longitude: number; //경도
    timeSnapshot: Date;
}
