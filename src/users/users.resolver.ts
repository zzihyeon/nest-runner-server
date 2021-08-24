import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput, UpdateUserExternalPlatformInfoInput } from './dto/update-user.input';

@Resolver('user')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @ResolveField()
  // async owner(@Parent() cat: Cat & { ownerId: number }): Promise<Owner> {
  //.  Return this.ownersService.findOneById(cat.ownerId);
  // }

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Query('userByEmail')
  findOneByEmail(@Args('emailAddress') emailAddress: string) {
    return this.usersService.findOneByEmail(emailAddress);
  }
  
  @Mutation('updateUserExternalPlatformInfo')
  updateUserExternalPlatformInfo(@Args('updateUserExternalPlatformInfoInput') updateUserExternalPlatformInfoInput: UpdateUserExternalPlatformInfoInput) {
    return this.usersService.updateExternalPlatformInfo(updateUserExternalPlatformInfoInput.id, updateUserExternalPlatformInfoInput.externalPlatformInfo);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}