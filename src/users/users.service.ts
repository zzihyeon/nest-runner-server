import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput, UpdateUserExternalPlatformInfoInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

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
      User.externalPlatformInfo.apple.emailAddress === emailAddress ||
      User.externalPlatformInfo.google.emailAddress === emailAddress ||
      User.externalPlatformInfo.naver.emailAddress === emailAddress ||
      User.externalPlatformInfo.kakao.emailAddress === emailAddress
    );
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  updateExternalPlatformInfo(id: string, updateUserExternalPlatformInput: UpdateUserExternalPlatformInfoInput): User {
    const idx = this.users.findIndex(user=>user.id === updateUserExternalPlatformInput.id)
    this.users[idx].externalPlatformInfo = updateUserExternalPlatformInput.externalPlatformInfo;
    return this.users[idx];
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}