import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('find All test', () => {
    const users = resolver.findAll();
    expect(users.length).toBe(0);
  });

  it('find User By ID test', () => {
    const user = resolver.findOne("test");
    expect(user).toBe(undefined);
  });
  
  it('Create test', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const user = resolver.create(createInput);
    expect(user.id).toBe("test");
    expect(user.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(user.externalPlatformInfo.naver.sex).toBe("male");
  });

  it('update User external platform info test', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const prevUser = resolver.create(createInput);
    expect(prevUser.id).toBe("test");
    expect(prevUser.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(prevUser.externalPlatformInfo.naver.sex).toBe("male");
    const user = resolver.updateUserExternalPlatformInfo({id:"test",externalPlatformInfo:{naver:{emailAddress:"test1@naver.com",sex:"female"}}});
    expect(user.id).toBe("test");
    expect(user.externalPlatformInfo.naver.emailAddress).toBe("test1@naver.com");
    expect(user.externalPlatformInfo.naver.sex).toBe("female");
  });

  it('find All test 1', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const prevUser = resolver.create(createInput);
    expect(prevUser.id).toBe("test");
    expect(prevUser.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(prevUser.externalPlatformInfo.naver.sex).toBe("male");
    const users = resolver.findAll();
    expect(users.length).toBe(1);
  });

  it('find User By ID test', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const prevUser = resolver.create(createInput);
    expect(prevUser.id).toBe("test");
    expect(prevUser.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(prevUser.externalPlatformInfo.naver.sex).toBe("male");
    const user = resolver.findOne("test");
    expect(user.id).toBe("test");
    expect(user.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(user.externalPlatformInfo.naver.sex).toBe("male");
  });
});
