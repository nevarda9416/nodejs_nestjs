import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './auth/guard/roles.guard';
import { Role } from './common/enum/roles.enum';
import { Roles } from './common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Roles(Role.Admin)
  getHello(): string {
    return this.appService.getHello();
  }
}
