import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create User test', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const user = service.create(createInput);
    expect(user.id).toBe("test");
    expect(user.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(user.externalPlatformInfo.naver.sex).toBe("male");
  });

  it('find all User test', () => {
    const user = service.findAll();
    expect(user.length).toBe(0);
  });

  it('find User test', () => {
    const user = service.findOne("test");
    expect(user).toBe(undefined);
  });

  it('find User by email test', () => {
    const user = service.findOneByEmail("test@naver.com");
    expect(user).toBe(undefined);
  });

  it('find all User test 1', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const prevUser = service.create(createInput);
    expect(prevUser.id).toBe("test");
    expect(prevUser.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(prevUser.externalPlatformInfo.naver.sex).toBe("male");
    const users = service.findAll();
    expect(users.length).toBe(1);
  });

  it('find User test 1', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const prevUser = service.create(createInput);
    expect(prevUser.id).toBe("test");
    expect(prevUser.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(prevUser.externalPlatformInfo.naver.sex).toBe("male");
    const user = service.findOne("test");
    expect(user.id).toBe("test");
    expect(user.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(user.externalPlatformInfo.naver.sex).toBe("male");
  });

  it('find User by email test 1', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const prevUser = service.create(createInput);
    expect(prevUser.id).toBe("test");
    expect(prevUser.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(prevUser.externalPlatformInfo.naver.sex).toBe("male");
    const user = service.findOneByEmail("test@naver.com");
    expect(user.id).toBe("test");
    expect(user.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(user.externalPlatformInfo.naver.sex).toBe("male");
  });

  it('update User external platform info 1', () => {
    const user = service.updateExternalPlatformInfo("test",{naver:{"emailAddress":"test1@naver.com",sex:"female"}});
    expect(user).toBe(null);
  });

  it('update User external platform info 1', () => {
    const createInput: CreateUserInput = {
      id:"test",
      externalPlatformInfo: {naver:{emailAddress:"test@naver.com",sex:"male"}},
      friends: [],
      userGroups: [],
    }
    const prevUser = service.create(createInput);
    expect(prevUser.id).toBe("test");
    expect(prevUser.externalPlatformInfo.naver.emailAddress).toBe("test@naver.com");
    expect(prevUser.externalPlatformInfo.naver.sex).toBe("male");
    const user = service.updateExternalPlatformInfo("test",{naver:{"emailAddress":"test1@naver.com",sex:"female"}});
    expect(user.id).toBe("test");
    expect(user.externalPlatformInfo.naver.emailAddress).toBe("test1@naver.com");
    expect(user.externalPlatformInfo.naver.sex).toBe("female");
  });
});
