import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './auth/guard/roles.guard';
import { Role } from './common/enum/roles.enum';
import { Roles } from './common/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Roles(Role.Admin)
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles('admin')
  @Get('dashboard')
  getDashboard(): string {
    return 'This is the admin dashboard';
  }
}
