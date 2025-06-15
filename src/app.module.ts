import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bull';
import { AudioProcessor } from './audio/audio.processor';
@Module({
  controllers: [AppController],
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'audio',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TaskModule,
    UserModule,
  ],
  providers: [AppService, AudioProcessor],
})
export class AppModule {}
