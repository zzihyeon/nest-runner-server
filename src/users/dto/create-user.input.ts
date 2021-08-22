import { ExternalPlatform } from '../entities/user.entity';

export class CreateUserInput {
  id: string;
  externalPlatformInfo: ExternalPlatform;
  friends: string[];        // user’s running friends
  userGroups: string[];      // user’s running friends
}