import { CreateRunningHistoryInput } from './create-running-history.input';
import { PartialType } from '@nestjs/mapped-types';
import { RunningPath } from "../entities/running-history.entity";

export class UpdateRunningHistoryInput extends PartialType(CreateRunningHistoryInput) {
  id: string;
  userID: string;
  runningPath: RunningPath;
}
