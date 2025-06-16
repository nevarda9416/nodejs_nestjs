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
import { CreateUserDto } from '../dto/create-user.dto';
@Controller('users')
export class UserController {
  constructor() {}
  @Get()
  searchUsers(@Query('name') name: string, @Query('email') email: string) {
    return `Searching users with name: ${name} and email: ${email}`;
  }
  @Get(':id/profile')
  getUserProfile(@Param('id') id: string, @Query('expand') expand: string) {
    return `User profile for ID: ${id} with expand option: ${expand}`;
  }
}
