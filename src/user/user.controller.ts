import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Query() query: any) {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param() params: any) {
    return this.userService.findOne(params.id);
  }
  @Get()
  searchUsers(@Query('name') name: string, @Query('email') email: string) {
    return `Searching users with name: ${name} and email: ${email}`;
  }
  @Get(':id/profile')
  getUserProfile(@Param('id') id: string, @Query('expand') expand: string) {
    return `User profile for ID: ${id} with expand option: ${expand}`;
  }
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(Number(id), data);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
