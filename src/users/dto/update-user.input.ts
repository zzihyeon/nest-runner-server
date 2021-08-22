import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';
import { ExternalPlatform } from '../entities/user.entity';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  id: string;
}

export class UpdateUserExternalPlatformInfoInput extends PartialType(CreateUserInput) {
  id: string;
  externalPlatformInfo: ExternalPlatform;
}

export class UpdateUserFrientdsInput extends PartialType(CreateUserInput) {
  id: string;
  friends: string[];
}

export class UpdateUserGroupsInput extends PartialType(CreateUserInput) {
  id: string;
  UserGroups: string[];
}