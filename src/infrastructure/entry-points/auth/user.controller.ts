import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserDBRepository } from './user.repository.types';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController implements IUserDBRepository {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/findById-user/:id')
  findById(@Param('id') id: string){
    return this.userService.findById(id);
  }

  @Get('/findByName-user/:name')
  findByName(@Param('name') name: string){
    return this.userService.findByName(name);
  }

  @Get('/findAll-user')
  findAll(){
    return this.userService.findAll();
  }

  @Put('/updateRole-user/:id')
  updateRole(@Param('id') id: string, @Body() role: string) {
    return this.userService.updateRole(id, role);
  }

  @Delete('/delete-user/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
