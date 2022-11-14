import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserDBRepository } from './user.repository.types';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController implements IUserDBRepository {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/findById-user')
  findById(@Body() id: string){
    return this.userService.findById(id);
  }

  @Post('/findByName-user')
  findByName(@Body() name: string){
    return this.userService.findByName(name); //FIX IT
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
