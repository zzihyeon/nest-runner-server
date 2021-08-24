import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, ExternalPlatform } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  create(createUserInput: CreateUserInput): User {
    const exist: User = this.users.find(user => user.id === createUserInput.id);
    if (exist !== null && exist !== undefined) {
      return null;
    }
    const userData: User = {...createUserInput, creationTime: new Date()};
    this.users.push(userData);
    return userData;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    return this.users.find(user=>user.id === id);
  }

  findOneByEmail(emailAddress: string): User {
    return this.users.find(
      User=>
      (User.externalPlatformInfo.apple && User.externalPlatformInfo.apple.emailAddress === emailAddress) ||
      (User.externalPlatformInfo.google && User.externalPlatformInfo.google.emailAddress === emailAddress) ||
      (User.externalPlatformInfo.naver && User.externalPlatformInfo.naver.emailAddress === emailAddress) ||
      (User.externalPlatformInfo.kakao && User.externalPlatformInfo.kakao.emailAddress === emailAddress)
    );
  }

  updateExternalPlatformInfo(id: string, externalPlatformInfo: ExternalPlatform): User {
    const idx = this.users.findIndex(user=>user.id === id)
    if (idx < 0){
      return null;
    }
    this.users[idx].externalPlatformInfo = externalPlatformInfo;
    return this.users[idx];
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}