import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this._userService.create(createUserDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this._userService.findAll(page, limit);
  }

  @Get(':id')
  findById(@Param('id') Id: number) {
    return this._userService.findById(Id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this._userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') Id: number) {
    return this._userService.remove(Id);
  }
}
