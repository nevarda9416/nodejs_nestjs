import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
@Module({
  //imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
})
export class UserModule {}
