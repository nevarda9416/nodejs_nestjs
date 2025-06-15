import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@UseGuards(RolesGuard)
@Controller('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles('admin')
  @Get('dashboard')
  getDashboard(): string {
    return 'This is the admin dashboard';
  }
}
