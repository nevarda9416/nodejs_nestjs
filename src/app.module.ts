import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'secret',
      database: 'nestjs_typeorm_postgres_passport_starter',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  providers: [AppService, AudioProcessor],
})
export class AppModule {}
